export interface BackdropOptions {
  opacity?: number; // 0-1
  blur?: string; // e.g., '4px'
  color?: string; // CSS color
  clickToClose?: boolean;
}

export type ThemeOption = 'auto' | 'light' | 'dark';

export interface LoaderOptions {
  target?: HTMLElement | string;
  type?: 'spinner' | 'dots' | 'bars' | 'image' | 'progress';
  size?: number;
  color?: string;
  speed?: number;
  overlay?: boolean | 'fullscreen' | 'inline';
  overlayZIndex?: number;
  backdrop?: BackdropOptions;
  ariaLabel?: string;
  image?: string | SVGElement;
  imageAnimation?: 'rotate' | 'pulse' | 'scale';
  theme?: ThemeOption;
  // Progress options
  progress?: number; // 0-100 initial value
  progressVariant?: 'linear' | 'circular';
}

export class LuminaLoader {
  private container: HTMLElement | null = null;
  private progressValue: number | null = null;
  private indeterminate = false;
  private progressEl: HTMLElement | null = null;
  private overlayEl: HTMLElement | null = null;
  private backdropEl: HTMLElement | null = null;
  private prevActiveElement: Element | null = null;
  private onKeydownHandler = (e: KeyboardEvent) => this.handleKeydown(e);
  private themeMediaQuery: MediaQueryList | null = null;
  private themeListener: ((e: MediaQueryListEvent) => void) | null = null;

  private currentTheme: ThemeOption | null = null;

  constructor(private opts: LoaderOptions = {}) {
    if (typeof opts.progress === 'number') {
      this.progressValue = Math.max(0, Math.min(100, opts.progress));
      this.indeterminate = false;
    }
    // initialize theme handling
    this.applyTheme();
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

  private createOverlay(target: HTMLElement) {
    // create overlay wrapper
    const overlay = document.createElement('div');
    overlay.className = 'lumina-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.tabIndex = -1;

    const backdrop = document.createElement('div');
    backdrop.className = 'lumina-backdrop';
    const backdropOpts = this.opts.backdrop || {};
    const opacity =
      typeof backdropOpts.opacity === 'number' ? backdropOpts.opacity : 0.5;
    const color = backdropOpts.color || 'black';
    const blur = backdropOpts.blur
      ? `backdrop-filter: blur(${backdropOpts.blur});`
      : '';
    backdrop.setAttribute(
      'style',
      `background:${color};opacity:${opacity};${blur}`,
    );

    if (backdropOpts.clickToClose) {
      backdrop.addEventListener('click', () => this.hide());
    }

    overlay.appendChild(backdrop);

    // set z-index (preserve any previously set inline style)
    const z = this.opts.overlayZIndex ?? 1000;
    const prevStyle = overlay.getAttribute('style') || '';
    overlay.setAttribute('style', `${prevStyle};z-index:${z}`);

    // apply initial theme attribute
    const theme = this.resolveTheme();
    if (theme) overlay.setAttribute('data-lumina-theme', theme);

    // insert into DOM
    (target ?? document.body).appendChild(overlay);

    this.overlayEl = overlay;
    this.backdropEl = backdrop;

    // if auto theme, watch media changes
    if ((this.opts.theme ?? 'auto') === 'auto') this.watchTheme();
  }

  private handleKeydown(e: KeyboardEvent) {
    if (!this.overlayEl) return;
    if (e.key === 'Tab') {
      const focusable = this.overlayEl.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        (last as HTMLElement).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        (first as HTMLElement).focus();
      }
    } else if (e.key === 'Escape') {
      this.hide();
    }
  }

  private trapFocus() {
    if (!this.overlayEl) return;
    this.prevActiveElement = document.activeElement;
    // focus first focusable or overlay
    const focusable = this.overlayEl.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length) (focusable[0] as HTMLElement).focus();
    else this.overlayEl.focus();
    document.addEventListener('keydown', this.onKeydownHandler);

    // ensure theme attribute stays in sync for auto
    if ((this.opts.theme ?? 'auto') === 'auto')
      this.applyThemeToElement(this.overlayEl);
  }

  private applyThemeToElement(el: HTMLElement | null) {
    if (!el) return;
    const theme = this.resolveTheme();
    if (theme) el.setAttribute('data-lumina-theme', theme);
    else el.removeAttribute('data-lumina-theme');
  }

  private resolveTheme(): ThemeOption | null {
    const theme = this.opts.theme ?? 'auto';
    if (theme === 'light' || theme === 'dark') return theme;
    // auto: use matchMedia (guard if not a function)
    if (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function'
    ) {
      try {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        return mq.matches ? 'dark' : 'light';
      } catch (e) {
        return 'light';
      }
    }
    return 'light';
  }

  private watchTheme() {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    try {
      this.themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.themeListener = (e: MediaQueryListEvent) => {
        // update stored theme and overlay attribute
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyThemeToElement(this.overlayEl);
      };
      const mq = this.themeMediaQuery;
      if (mq) {
        if ('addEventListener' in mq) {
          mq.addEventListener(
            'change',
            this.themeListener as unknown as EventListener,
          );
        } else if ('addListener' in mq) {
          // older APIs
          (
            mq as unknown as { addListener: (f: EventListener) => void }
          ).addListener(this.themeListener as unknown as EventListener);
        }
      }
    } catch (e) {
      // ignore if not supported
      this.themeMediaQuery = null;
      this.themeListener = null;
    }
  }

  private applyTheme() {
    const theme = this.opts.theme ?? 'auto';
    if (theme === 'light' || theme === 'dark') {
      this.currentTheme = theme;
      // no overlay yet; if mounted, apply
      this.applyThemeToElement(this.overlayEl || this.container);
      return;
    }

    // auto: determine current system preference and set
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      try {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        this.currentTheme = mq.matches ? 'dark' : 'light';
      } catch (e) {
        this.currentTheme = 'light';
      }
    } else {
      this.currentTheme = 'light';
    }
    // if mounted, apply
    this.applyThemeToElement(this.overlayEl || this.container);
  }

  private releaseFocus() {
    document.removeEventListener('keydown', this.onKeydownHandler);
    if (this.prevActiveElement instanceof HTMLElement)
      (this.prevActiveElement as HTMLElement).focus();
    this.prevActiveElement = null;

    // stop watching media
    if (this.themeMediaQuery && this.themeListener) {
      try {
        if ('removeEventListener' in this.themeMediaQuery) {
          this.themeMediaQuery.removeEventListener(
            'change',
            this.themeListener,
          );
        } else if ('removeListener' in this.themeMediaQuery) {
          (
            this.themeMediaQuery as unknown as {
              removeListener: (f: EventListener) => void;
            }
          ).removeListener(this.themeListener as unknown as EventListener);
        }
      } catch (e) {
        // fallback
      }
      this.themeListener = null;
      this.themeMediaQuery = null;
    }
  }

  mount() {
    if (this.container) return;
    const target =
      typeof this.opts.target === 'string'
        ? document.querySelector(this.opts.target)
        : (this.opts.target ?? document.body);

    // create root
    const el = document.createElement('div');
    el.className = 'lumina-root';
    el.setAttribute('aria-hidden', 'true');

    // overlay handling
    if (this.opts.overlay) {
      this.createOverlay(target as HTMLElement);
      // overlay's content container will receive loader
      const contentHost = document.createElement('div');
      contentHost.className = 'lumina-overlay-content';
      if (this.opts.type === 'image' && this.opts.image) {
        const content = this.createImageElement();
        const loader = document.createElement('div');
        loader.className = 'lumina-loader lumina-image';
        loader.appendChild(content);
        contentHost.appendChild(loader);
      } else if (this.opts.type === 'progress') {
        this.renderProgress(contentHost);
      } else {
        const loader = document.createElement('div');
        loader.className = `lumina-loader lumina-${this.opts.type || 'spinner'}`;
        loader.innerHTML = `<div class="lumina-spinner"></div>`;
        contentHost.appendChild(loader);
      }
      if (this.overlayEl) this.overlayEl.appendChild(contentHost);
      this.container = this.overlayEl;
    } else {
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
  }

  show() {
    if (!this.container) this.mount();
    this.container?.setAttribute('aria-hidden', 'false');

    // overlay specific behavior
    if (this.overlayEl) {
      // set aria-busy on target section
      const target =
        typeof this.opts.target === 'string'
          ? document.querySelector(this.opts.target)
          : (this.opts.target ?? document.body);
      if (target instanceof HTMLElement)
        target.setAttribute('aria-busy', 'true');
      this.trapFocus();
    }
  }

  hide() {
    this.container?.setAttribute('aria-hidden', 'true');
    if (this.overlayEl) {
      const target =
        typeof this.opts.target === 'string'
          ? document.querySelector(this.opts.target)
          : (this.opts.target ?? document.body);
      if (target instanceof HTMLElement) target.removeAttribute('aria-busy');
      this.releaseFocus();
      // remove overlay DOM
      this.overlayEl.remove();
      this.overlayEl = null;
      this.backdropEl = null;
      this.container = null;
    }
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
    if (this.overlayEl) {
      this.overlayEl.remove();
      this.overlayEl = null;
      this.backdropEl = null;
    }
    this.releaseFocus();
    this.container?.remove();
    this.container = null;
  }
}
