export interface LoaderOptions {
  target?: HTMLElement | string;
  type?: 'spinner' | 'dots' | 'bars' | 'image' | 'progress';
  size?: number;
  color?: string;
  speed?: number;
  overlay?: boolean;
  ariaLabel?: string;
  image?: string | SVGElement;
  imageAnimation?: 'rotate' | 'pulse' | 'scale';
}

export class LuminaLoader {
  private container: HTMLElement | null = null;
  constructor(private opts: LoaderOptions = {}) {}

  private createImageElement(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lumina-image-wrapper';
    const sizeStyle = this.opts.size ? `width:${this.opts.size}px;height:${this.opts.size}px;` : '';

    if (typeof this.opts.image === 'string') {
      const img = document.createElement('img');
      img.className = 'lumina-image';
      img.src = this.opts.image;
      img.alt = this.opts.ariaLabel || 'loading';
      img.setAttribute('style', `max-width:100%;max-height:100%;${sizeStyle}`);
      wrapper.appendChild(img);
    } else if (this.opts.image instanceof SVGElement) {
      const svg = this.opts.image.cloneNode(true) as SVGElement;
      svg.classList.add('lumina-image');
      if (this.opts.size) {
        svg.setAttribute('width', String(this.opts.size));
        svg.setAttribute('height', String(this.opts.size));
      }
      wrapper.appendChild(svg);
    }

    if (this.opts.imageAnimation) {
      wrapper.classList.add(`lumina-${this.opts.imageAnimation}`);
    }

    return wrapper;
  }

  mount() {
    if (this.container) return;
    const target = typeof this.opts.target === 'string' ? document.querySelector(this.opts.target) : this.opts.target ?? document.body;
    const el = document.createElement('div');
    el.className = 'lumina-root';
    el.setAttribute('aria-hidden', 'true');

    if (this.opts.type === 'image' && this.opts.image) {
      const content = this.createImageElement();
      const loader = document.createElement('div');
      loader.className = 'lumina-loader lumina-image';
      loader.appendChild(content);
      el.appendChild(loader);
    } else {
      el.innerHTML = `<div class="lumina-loader lumina-${this.opts.type || 'spinner'}"><div class="lumina-spinner"></div></div>`; // simple inner spinner element
    }

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
