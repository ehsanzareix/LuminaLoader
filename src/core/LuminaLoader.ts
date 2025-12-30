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
  // Progress options
  progress?: number; // 0-100 initial value
  progressVariant?: 'linear' | 'circular';
}

export class LuminaLoader {
  private container: HTMLElement | null = null;
  private progressValue: number | null = null;
  private indeterminate: boolean = false;
  private progressEl: HTMLElement | null = null;

  constructor(private opts: LoaderOptions = {}) {
    if (typeof opts.progress === 'number') {
      this.progressValue = Math.max(0, Math.min(100, opts.progress));
      this.indeterminate = false;
    }
  }

  private createImageElement(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lumina-image-wrapper';
    const sizeStyle = this.opts.size
      ? `width:${this.opts.size}px;height:${this.opts.size}px;`
      : '';

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

  private renderProgress(container: HTMLElement) {
    const variant = this.opts.progressVariant || 'linear';
    const wrapper = document.createElement('div');
    wrapper.className = `lumina-progress lumina-progress-${variant}`;
    wrapper.setAttribute('role', 'progressbar');
    wrapper.setAttribute('aria-valuemin', '0');
    wrapper.setAttribute('aria-valuemax', '100');

    if (variant === 'linear') {
      const track = document.createElement('div');
      track.className = 'lumina-progress-track';
      const bar = document.createElement('div');
      bar.className = 'lumina-progress-bar';
      if (this.progressValue !== null) {
        bar.style.width = `${this.progressValue}%`;
        bar.setAttribute('aria-valuenow', String(this.progressValue));
      } else if (this.indeterminate) {
        bar.classList.add('lumina-indeterminate');
      }
      track.appendChild(bar);
      wrapper.appendChild(track);
      this.progressEl = bar;
    } else {
      // circular
      const size = this.opts.size || 80;
      const svgNS = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(svgNS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('width', String(size));
      svg.setAttribute('height', String(size));
      svg.classList.add('lumina-progress-circular');

      const circleBg = document.createElementNS(svgNS, 'circle');
      circleBg.setAttribute('cx', '50');
      circleBg.setAttribute('cy', '50');
      circleBg.setAttribute('r', '45');
      circleBg.setAttribute('class', 'lumina-progress-bg');
      svg.appendChild(circleBg);

      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', '50');
      circle.setAttribute('cy', '50');
      circle.setAttribute('r', '45');
      circle.setAttribute('class', 'lumina-progress-circle');
      const circumference = 2 * Math.PI * 45;
      circle.setAttribute('stroke-dasharray', String(circumference));
      const offset =
        this.progressValue !== null
          ? ((100 - this.progressValue) / 100) * circumference
          : circumference;
      circle.setAttribute('stroke-dashoffset', String(offset));
      if (this.progressValue !== null)
        circle.setAttribute('aria-valuenow', String(this.progressValue));
      svg.appendChild(circle);

      wrapper.appendChild(svg);
      this.progressEl = circle as unknown as HTMLElement;
    }

    container.appendChild(wrapper);
  }

  mount() {
    if (this.container) return;
    const target =
      typeof this.opts.target === 'string'
        ? document.querySelector(this.opts.target)
        : (this.opts.target ?? document.body);
    const el = document.createElement('div');
    el.className = 'lumina-root';
    el.setAttribute('aria-hidden', 'true');

    if (this.opts.type === 'image' && this.opts.image) {
      const content = this.createImageElement();
      const loader = document.createElement('div');
      loader.className = 'lumina-loader lumina-image';
      loader.appendChild(content);
      el.appendChild(loader);
    } else if (this.opts.type === 'progress') {
      this.renderProgress(el);
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

  setProgress(percent: number) {
    const p = Math.max(0, Math.min(100, Math.round(percent)));
    this.progressValue = p;
    this.indeterminate = false;
    if (!this.container) return;
    const roleEl = this.container.querySelector(
      '[role="progressbar"]',
    ) as HTMLElement | null;
    if (!roleEl) return;

    if (
      roleEl.classList.contains('lumina-progress-linear') ||
      (roleEl.classList.contains('lumina-progress') &&
        roleEl.querySelector('.lumina-progress-bar'))
    ) {
      const bar = roleEl.querySelector(
        '.lumina-progress-bar',
      ) as HTMLElement | null;
      if (bar) {
        bar.style.width = `${p}%`;
        bar.setAttribute('aria-valuenow', String(p));
        bar.classList.remove('lumina-indeterminate');
      }
    } else {
      const circle = roleEl.querySelector(
        '.lumina-progress-circle',
      ) as SVGElement | null;
      if (circle) {
        const circumference =
          Number(circle.getAttribute('stroke-dasharray')) || 2 * Math.PI * 45;
        const offset = ((100 - p) / 100) * circumference;
        circle.setAttribute('stroke-dashoffset', String(offset));
        circle.setAttribute('aria-valuenow', String(p));
      }
    }
  }

  setIndeterminate(v = true) {
    this.indeterminate = v;
    this.progressValue = null;
    if (!this.container) return;
    const roleEl = this.container.querySelector(
      '[role="progressbar"]',
    ) as HTMLElement | null;
    if (!roleEl) return;
    const bar = roleEl.querySelector(
      '.lumina-progress-bar',
    ) as HTMLElement | null;
    if (bar) {
      if (v) bar.classList.add('lumina-indeterminate');
      else bar.classList.remove('lumina-indeterminate');
    }
  }

  destroy() {
    this.container?.remove();
    this.container = null;
  }
}
