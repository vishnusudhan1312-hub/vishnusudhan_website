import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { JUMP_OFFSET, setSmoothScroll } from './scroll';

gsap.registerPlugin(ScrollTrigger);

// Scroll-scrubbed moments use a cubic ease-out (power2 in GSAP's naming).
const EASE = 'power2.out';

function smoothScroll(): void {
  const lenis = new Lenis({ autoRaf: false, anchors: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  setSmoothScroll((target) => lenis.scrollTo(target, { offset: -JUMP_OFFSET }));
}

function tiltFirstExchange(): void {
  const el = document.querySelector<HTMLElement>('[data-tilt]');
  if (!el) return;
  gsap.fromTo(
    el,
    { transformPerspective: 1400, rotateX: 26, scale: 0.9, opacity: 0.4 },
    {
      rotateX: 0,
      scale: 1,
      opacity: 1,
      ease: EASE,
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 25%', scrub: true },
    },
  );
}

function partnershipLine(): void {
  const fig = document.querySelector<HTMLElement>('[data-pline]');
  if (!fig) return;
  const nodes = Array.from(fig.querySelectorAll<HTMLElement>('[data-at]')).map((n) => ({
    el: n,
    at: Number(n.dataset.at),
  }));
  fig.classList.add('scrub');
  const apply = (p: number) => {
    fig.style.setProperty('--p', p.toFixed(4));
    nodes.forEach((n) => n.el.classList.toggle('lit', p >= n.at));
  };
  ScrollTrigger.create({
    trigger: fig,
    start: 'top 85%',
    end: 'top 15%',
    scrub: true,
    onUpdate: (self) => apply(self.progress),
    onRefresh: (self) => apply(self.progress),
  });
}

function principlesInk(): void {
  document.querySelectorAll<HTMLElement>('[data-principle]').forEach((block) => {
    const ink = block.querySelector<HTMLElement>('[data-ink]');
    const heading = ink?.parentElement;
    if (!ink || !heading) return;
    block.classList.add('scrub');
    const apply = (p: number) => {
      ink.style.setProperty('--p', `${(p * 100).toFixed(2)}%`);
      block.classList.toggle('inked', p > 0.97);
    };
    ScrollTrigger.create({
      trigger: heading,
      start: 'top 82%',
      end: 'top 37%',
      scrub: true,
      onUpdate: (self) => apply(self.progress),
      onRefresh: (self) => apply(self.progress),
    });
  });
}

function certificateFan(): void {
  const list = document.querySelector<HTMLElement>('[data-fan]');
  if (!list) return;
  const items = Array.from(list.querySelectorAll<HTMLElement>('[data-fan-item]'));
  const first = items[0];
  if (!first) return;
  gsap.fromTo(
    items,
    {
      y: (i: number, el: HTMLElement) => first.offsetTop - el.offsetTop + i * 8,
      rotate: (i: number) => (i - 1.5) * 4,
      opacity: (i: number) => (i === 0 ? 1 : 0.2),
    },
    {
      y: 0,
      rotate: 0,
      opacity: 1,
      ease: EASE,
      scrollTrigger: {
        trigger: list,
        start: 'top 92%',
        end: 'top 42%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  );
}

export function start(): void {
  smoothScroll();
  tiltFirstExchange();
  partnershipLine();
  principlesInk();
  certificateFan();
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
