(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('vs-theme', next); } catch (_) {}
    });
  }

  const splitTargets = document.querySelectorAll('[data-split]');
  splitTargets.forEach(el => {
    const lines = el.querySelectorAll('.l1, .l2');
    let charIdx = 0;
    lines.forEach(line => {
      const tmp = document.createElement('div');
      tmp.innerHTML = line.innerHTML;
      const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          [...node.textContent].forEach(c => {
            if (c === ' ') {
              frag.appendChild(document.createTextNode(' '));
            } else {
              const span = document.createElement('span');
              span.className = 'char';
              span.style.animationDelay = (0.04 * charIdx++).toFixed(2) + 's';
              span.textContent = c;
              frag.appendChild(span);
            }
          });
          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          [...node.childNodes].forEach(walk);
        }
      };
      [...tmp.childNodes].forEach(walk);
      line.innerHTML = tmp.innerHTML;
    });
  });

  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    const updateProgress = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const scrolled = total > 0 ? (h.scrollTop / total) : 0;
      progressBar.style.width = (scrolled * 100) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-in'));
  }

  const quoteText = document.querySelector('.quote-text');
  if (quoteText && 'IntersectionObserver' in window && !reduceMotion) {
    const qio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          quoteText.classList.add('is-revealed');
          qio.unobserve(e.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });
    qio.observe(quoteText);
  } else if (quoteText) {
    quoteText.classList.add('is-revealed');
  }

  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    let revealed = false;
    emailLink.addEventListener('click', (e) => {
      const user = emailLink.dataset.user;
      const domain = emailLink.dataset.domain;
      const addr = user + '@' + domain;
      const valEl = emailLink.querySelector('.email-val');
      if (!revealed) {
        e.preventDefault();
        valEl.textContent = addr;
        emailLink.href = 'mailto:' + addr;
        revealed = true;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(addr).then(() => {
            valEl.textContent = addr + '  ·  copied';
            setTimeout(() => { valEl.textContent = addr; }, 1800);
          }).catch(() => {});
        }
      }
    });
  }
})();
