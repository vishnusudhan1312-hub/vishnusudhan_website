import { scrollToTarget } from './scroll';

const root = document.documentElement;
const motionOK = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

const $ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => scope.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) =>
  Array.from(scope.querySelectorAll<T>(sel));

/* Theme */
// Mirrors --bg in tokens.css; avoids a forced style recalc just to read it.
const THEME_BG = { light: '#fbf7f2', dark: '#0e0d0c' } as const;

function syncThemeColor(): void {
  const bg = THEME_BG[root.dataset.theme === 'dark' ? 'dark' : 'light'];
  $$<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => (m.content = bg));
}

function initTheme(): void {
  const toggle = $('[data-theme-toggle]');
  const set = (theme: 'light' | 'dark', persist: boolean) => {
    root.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem('theme', theme);
      } catch {
        /* storage blocked: theme still applies for this visit */
      }
    }
    syncThemeColor();
  };

  toggle?.addEventListener('click', () => set(root.dataset.theme === 'dark' ? 'light' : 'dark', true));

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem('theme');
    } catch {
      /* ignore */
    }
    if (!stored) set(e.matches ? 'dark' : 'light', false);
  });

  syncThemeColor();
}

/* Header clock + status */
const statusEl = $('[data-status]');
let typingCount = 0;

function setTyping(delta: 1 | -1): void {
  typingCount = Math.max(0, typingCount + delta);
  const typing = typingCount > 0;
  root.classList.toggle('is-typing', typing);
  if (statusEl) statusEl.textContent = typing ? 'typing…' : 'online';
}

function initClock(): void {
  const clock = $('[data-clock]');
  if (!clock) return;
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const tick = () => (clock.textContent = fmt.format(new Date()));
  tick();
  window.setInterval(tick, 20_000);
}

/* Bubble reveals, typing indicator, read ticks */
function reveal(el: HTMLElement): void {
  el.classList.add('is-in');
  if (el.hasAttribute('data-guest')) {
    window.setTimeout(() => el.classList.add('is-read'), 900);
  }
  if (el.hasAttribute('data-say')) {
    setTyping(1);
    window.setTimeout(() => {
      el.classList.add('is-typed');
      setTyping(-1);
    }, 750);
  }
}

function initReveals(): void {
  const items = $$('[data-reveal]');
  if (!motionOK || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in', 'is-read', 'is-typed'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        io.unobserve(entry.target);
        reveal(entry.target as HTMLElement);
      }
    },
    { threshold: 0.3 },
  );
  items.forEach((el) => io.observe(el));
}

/* Hero: pointer parallax while the question marks are visible */
function initParallax(): void {
  const marks = $$('.hero .mark');
  if (!marks.length) return;
  const done = () => marks.forEach((m) => (m.style.display = 'none'));
  if (!motionOK) return;
  window.setTimeout(done, 1500);
  if (!finePointer) return;

  const depths = marks.map((m) => Number(m.dataset.depth) || 0);
  let frame = 0;
  let x = 0;
  let y = 0;
  const onMove = (e: PointerEvent) => {
    x = e.clientX / window.innerWidth - 0.5;
    y = e.clientY / window.innerHeight - 0.5;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      marks.forEach((m, i) => {
        m.style.transform = `translate(${-x * depths[i]! * 60}px, ${-y * depths[i]! * 40}px)`;
      });
    });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.setTimeout(() => window.removeEventListener('pointermove', onMove), 1500);
}

/* "Ask me something" chips: smooth jump + focus the question */
function initJumps(): void {
  document.addEventListener('click', (e) => {
    const link = (e.target as Element).closest<HTMLAnchorElement>('a[data-jump]');
    if (!link) return;
    const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    history.pushState(null, '', link.hash);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    scrollToTarget(target, motionOK);
  });
}

/* Career carousel: coverflow, mouse drag, keyboard. Set up when it nears the viewport, so page
   load doesn't pay for measuring it. */
function initCarousel(): void {
  const track = $('[data-track]');
  if (!track) return;
  if (!('IntersectionObserver' in window)) {
    setupCarousel(track);
    return;
  }
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      setupCarousel(track);
    },
    { rootMargin: '400px 0px' },
  );
  io.observe(track);
}

function setupCarousel(track: HTMLElement): void {
  const stops = $$('[data-stop]', track);
  const count = $('[data-count]', track.closest('[data-career]') ?? document);
  if (stops.length < 2) return;

  let centers: number[] = [];
  let step = 1;
  let current = 0;
  let pending: number | null = null;
  let frame = 0;

  const measure = () => {
    centers = stops.map((s) => s.offsetLeft + s.offsetWidth / 2);
    step = stops[1]!.offsetLeft - stops[0]!.offsetLeft || 1;
  };

  const nearest = () => {
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    centers.forEach((c, i) => {
      const d = Math.abs(c - mid);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  };

  const paint = () => {
    frame = 0;
    const mid = track.scrollLeft + track.clientWidth / 2;
    stops.forEach((s, i) => {
      const off = Math.max(-2, Math.min(2, (centers[i]! - mid) / step));
      const a = Math.abs(off);
      if (motionOK) {
        s.style.transform = `rotateY(${off * -24}deg) translateZ(${-a * 60}px) scale(${1 - a * 0.06})`;
      }
      s.style.opacity = String(1 - Math.min(1, a) * 0.45);
    });
    const idx = nearest();
    if (idx === pending) pending = null;
    if (idx !== current || !count?.textContent) {
      current = idx;
      if (count) count.textContent = String(idx + 1).padStart(2, '0');
    }
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(paint);
  };

  const goTo = (i: number, smooth = motionOK) => {
    const idx = Math.max(0, Math.min(stops.length - 1, i));
    pending = idx;
    track.scrollTo({ left: centers[idx]! - track.clientWidth / 2, behavior: smooth ? 'smooth' : 'auto' });
  };

  measure();
  paint();
  track.addEventListener('scroll', schedule, { passive: true });
  track.addEventListener('scrollend', () => (pending = null));
  new ResizeObserver(() => {
    measure();
    schedule();
  }).observe(track);

  track.addEventListener('keydown', (e) => {
    const from = pending ?? current;
    const keys: Record<string, number> = { ArrowRight: from + 1, ArrowLeft: from - 1, Home: 0, End: stops.length - 1 };
    if (!(e.key in keys)) return;
    e.preventDefault();
    goTo(keys[e.key]!);
  });

  // Mouse drag. Touch keeps native scrolling.
  let down = false;
  let moved = false;
  let startX = 0;
  let startLeft = 0;
  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    e.preventDefault(); // stops the browser starting a text selection instead of a drag
    track.classList.remove('dragging');
    down = true;
    moved = false;
    startX = e.clientX;
    startLeft = track.scrollLeft;
  });
  window.addEventListener('pointermove', (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (!moved && Math.abs(dx) < 4) return;
    if (!moved) {
      moved = true;
      track.classList.add('dragging');
    }
    track.scrollLeft = startLeft - dx * 1.2;
  });
  window.addEventListener('pointerup', () => {
    if (!down) return;
    down = false;
    if (!moved) return;
    // Keep snapping off until the settle scroll ends, so snap doesn't fight it. The timer covers
    // the case where no scroll happens (already centred) and scrollend never fires.
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      track.classList.remove('dragging');
    };
    track.addEventListener('scrollend', release, { once: true });
    window.setTimeout(release, 600);
    goTo(nearest());
  });
}

/* Flip cards */
function initFlips(): void {
  $$('[data-flip]').forEach((card) => {
    const btn = $<HTMLButtonElement>('.flip-btn', card);
    btn?.addEventListener('click', () => {
      const flipped = card.classList.toggle('is-flipped');
      btn.setAttribute('aria-pressed', String(flipped));
    });
  });
}

/* Composer: builds a mailto link. Nothing is sent or stored by this site. */
function initComposer(): void {
  const composer = $('[data-composer]');
  const input = $<HTMLInputElement>('[data-compose-input]');
  const send = $('[data-compose-send]');
  const contact = $('[data-contact]');
  if (!composer || !input || !send) return;

  const email = composer.dataset.email ?? '';
  const subject = composer.dataset.subject ?? '';
  let pastHero = false;
  let contactOnScreen = false;

  const sync = () => {
    const focused = composer.contains(document.activeElement);
    composer.classList.toggle('is-shown', pastHero && (!contactOnScreen || focused));
  };

  let frame = 0;
  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const next = window.scrollY > window.innerHeight * 0.7;
      if (next !== pastHero) {
        pastHero = next;
        sync();
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      contactOnScreen = Boolean(entry?.isIntersecting);
      sync();
    }).observe(contact);
  }
  composer.addEventListener('focusout', () => window.setTimeout(sync, 0));

  const open = () => {
    const text = input.value.trim();
    let href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    if (text) href += `&body=${encodeURIComponent(text)}`;
    window.location.href = href;
  };
  send.addEventListener('click', open);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.isComposing) {
      e.preventDefault();
      open();
    }
  });
}

initTheme();
initClock();
initReveals();
initParallax();
initJumps();
initCarousel();
initFlips();
initComposer();
root.classList.add('ready');

// Scroll effects are enhancements: load them once the page is idle, off the startup path.
if (motionOK) {
  const loadMotion = () =>
    import('./motion')
      .then((m) => m.start())
      .catch(() => {
        /* the page is complete without them */
      });
  if ('requestIdleCallback' in window) window.requestIdleCallback(loadMotion, { timeout: 1500 });
  else window.setTimeout(loadMotion, 200);
}
