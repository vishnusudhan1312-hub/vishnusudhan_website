export const JUMP_OFFSET = 120;

type ScrollFn = (target: HTMLElement) => void;

let smoothScroll: ScrollFn | null = null;

export function setSmoothScroll(fn: ScrollFn): void {
  smoothScroll = fn;
}

export function scrollToTarget(target: HTMLElement, smooth: boolean): void {
  if (smoothScroll) {
    smoothScroll(target);
    return;
  }
  const top = target.getBoundingClientRect().top + window.scrollY - JUMP_OFFSET;
  window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
}
