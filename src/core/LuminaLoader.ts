export interface LoaderOptions {
  target?: HTMLElement | string;
  type?: 'spinner' | 'dots' | 'bars' | 'image' | 'progress';
  size?: number;
  color?: string;
  speed?: number;
  overlay?: boolean;
  ariaLabel?: string;
  image?: string;
}

export class LuminaLoader {
  private container: HTMLElement | null = null;
  constructor(private opts: LoaderOptions = {}) {}
  mount() {
    if (this.container) return;
    const target = typeof this.opts.target === 'string' ? document.querySelector(this.opts.target) : this.opts.target ?? document.body;
    const el = document.createElement('div');
    el.className = 'lumina-root';
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = `<div class="lumina-loader lumina-${this.opts.type || 'spinner'}"><div class="lumina-spinner"></div></div>`; // simple inner spinner element
    (target ?? document.body).appendChild(el);
    this.container = el;
  }
  show() {
    if (!this.container) this.mount();
    this.container?.setAttribute('aria-hidden', 'false');
  }
  hide() {
    this.container?.setAttribute('aria-hidden', 'true');
  }
  destroy() {
    this.container?.remove();
    this.container = null;
  }
}
