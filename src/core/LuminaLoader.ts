export interface BackdropOptions {
  opacity?: number;
  blur?: string;
  color?: string;
  clickToClose?: boolean;
}

export type ThemeOption = 'auto' | 'light' | 'dark';

export interface LoaderOptions {
  target?: HTMLElement | string;
  type?:
    | 'spinner'
    | 'dots'
    | 'bars'
    | 'pulse'
    | 'gradient-ring'
    | 'orbit'
    | 'wave'
    | 'image'
    | 'progress';
  size?: number;
  color?: string;
  speed?: number;
  overlay?: boolean | 'fullscreen' | 'inline';
  overlayZIndex?: number;
  backdrop?: BackdropOptions;
  ariaLabel?: string;
  image?: string | SVGElement;
  imageAnimation?: 'rotate' | 'pulse' | 'scale' | 'bounce';
  theme?: ThemeOption;
  progress?: number;
  progressVariant?: 'linear' | 'circular';
  text?: string; // Loading text
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
    this.applyTheme();
  }

  private createDotsLoader(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lumina-dots-wrapper';
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'lumina-dot';
      dot.style.animationDelay = `${i * 0.15}s`;
      wrapper.appendChild(dot);
    }
    return wrapper;
  }

  private createBarsLoader(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lumina-bars-wrapper';
    for (let i = 0; i < 5; i++) {
      const bar = document.createElement('div');
      bar.className = 'lumina-bar';
      bar.style.animationDelay = `${i * 0.1}s`;
      wrapper.appendChild(bar);
    }
    return wrapper;
  }

  private createPulseLoader(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lumina-pulse-wrapper';
    for (let i = 0; i < 3; i++) {
      const ring = document.createElement('div');
      ring.className = 'lumina-pulse-ring';
      ring.style.animationDelay = `${i * 0.4}s`;
      wrapper.appendChild(ring);
    }
    return wrapper;
  }

  private createGradientRingLoader(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lumina-gradient-ring';
    return wrapper;
  }

  private createOrbitLoader(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lumina-orbit-wrapper';
    for (let i = 0; i < 3; i++) {
      const orbit = document.createElement('div');
      orbit.className = 'lumina-orbit';
      orbit.style.animationDelay = `${i * 0.4}s`;
      const planet = document.createElement('div');
      planet.className = 'lumina-planet';
      orbit.appendChild(planet);
      wrapper.appendChild(orbit);
    }
    return wrapper;
  }

  private createWaveLoader(): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lumina-wave-wrapper';
    for (let i = 0; i < 5; i++) {
      const wave = document.createElement('div');
      wave.className = 'lumina-wave';
      wave.style.animationDelay = `${i * 0.1}s`;
      wrapper.appendChild(wave);
    }
    return wrapper;
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

  private createOverlay(target: HTMLElement | null) {
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
    const color = backdropOpts.color || 'rgba(0, 0, 0, 0.8)';
    const blur = backdropOpts.blur
      ? `backdrop-filter: blur(${backdropOpts.blur});-webkit-backdrop-filter: blur(${backdropOpts.blur});`
      : 'backdrop-filter: blur(8px);-webkit-backdrop-filter: blur(8px);';
    backdrop.setAttribute(
      'style',
      `background:${color};opacity:${opacity};${blur}`,
    );

    if (backdropOpts.clickToClose) {
      backdrop.addEventListener('click', () => this.hide());
    }

    overlay.appendChild(backdrop);

    const z = this.opts.overlayZIndex ?? 1000;
    const prevStyle = overlay.getAttribute('style') || '';
    overlay.setAttribute('style', `${prevStyle};z-index:${z}`);

    const theme = this.resolveTheme();
    if (theme) overlay.setAttribute('data-lumina-theme', theme);

    let mountRoot: HTMLElement | null = null;
    try {
      if (typeof document !== 'undefined' && document.body)
        mountRoot = document.body;
    } catch (e) {
      void e;
    }

    if (!mountRoot && target instanceof HTMLElement) mountRoot = target;
    if (!mountRoot && this.hasAppendChild(target)) {
      mountRoot = target as unknown as HTMLElement;
    }

    if (mountRoot && typeof mountRoot.appendChild === 'function') {
      mountRoot.appendChild(overlay);
    } else if (typeof document !== 'undefined' && document.body) {
      document.body.appendChild(overlay);
    } else {
      console.warn(
        'LuminaLoader: unable to mount overlay — no valid mount root found.',
      );
    }

    this.overlayEl = overlay;
    this.backdropEl = backdrop;

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
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === 'Escape') {
      this.hide();
    }
  }

  private trapFocus() {
    if (!this.overlayEl) return;
    this.prevActiveElement = document.activeElement;
    const focusable = this.overlayEl.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length) focusable[0].focus();
    else this.overlayEl.focus();
    document.addEventListener('keydown', this.onKeydownHandler);
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

  private addMediaQueryListener(
    mq: MediaQueryList,
    listener: (e: MediaQueryListEvent) => void,
  ) {
    if ('addEventListener' in mq) {
      mq.addEventListener('change', listener as unknown as EventListener);
    } else if ('addListener' in mq) {
      const legacy = mq as MediaQueryList & {
        addListener?: (l: (e: MediaQueryListEvent) => void) => void;
      };
      if (legacy.addListener) {
        if (legacy.addListener) {
          (legacy.addListener as (l: (e: MediaQueryListEvent) => void) => void)(
            listener,
          );
        }
      }
    }
  }

  private removeMediaQueryListener(
    mq: MediaQueryList,
    listener: (e: MediaQueryListEvent) => void,
  ) {
    if ('removeEventListener' in mq) {
      mq.removeEventListener('change', listener as unknown as EventListener);
    } else if ('removeListener' in mq) {
      const legacy = mq as MediaQueryList & {
        removeListener?: (l: (e: MediaQueryListEvent) => void) => void;
      };
      if (legacy.removeListener) {
        if (legacy.removeListener) {
          (
            legacy.removeListener as (
              l: (e: MediaQueryListEvent) => void,
            ) => void
          )(listener);
        }
      }
    }
  }

  private watchTheme() {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    try {
      this.themeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.themeListener = (e: MediaQueryListEvent) => {
        this.currentTheme = e.matches ? 'dark' : 'light';
        this.applyThemeToElement(this.overlayEl);
      };
      const mq = this.themeMediaQuery;
      if (mq) {
        this.addMediaQueryListener(mq, this.themeListener);
      }
    } catch (e) {
      this.themeMediaQuery = null;
      this.themeListener = null;
    }
  }

  private hasAppendChild(v: unknown): v is { appendChild: (n: Node) => void } {
    return (
      typeof v === 'object' &&
      v !== null &&
      'appendChild' in v &&
      typeof (v as { appendChild?: unknown }).appendChild === 'function'
    );
  }

  private applyTheme() {
    const theme = this.opts.theme ?? 'auto';
    if (theme === 'light' || theme === 'dark') {
      this.currentTheme = theme;
      this.applyThemeToElement(this.overlayEl || this.container);
      return;
    }
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
    this.applyThemeToElement(this.overlayEl || this.container);
  }

  private releaseFocus() {
    document.removeEventListener('keydown', this.onKeydownHandler);
    if (this.prevActiveElement instanceof HTMLElement)
      this.prevActiveElement.focus();
    this.prevActiveElement = null;
    if (this.themeMediaQuery && this.themeListener) {
      try {
        this.removeMediaQueryListener(this.themeMediaQuery, this.themeListener);
      } catch (e) {
        // Ignore errors when removing listeners from older browsers
        void e;
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

    const el = document.createElement('div');
    el.className = 'lumina-root';
    el.setAttribute('aria-hidden', 'true');

    if (this.opts.overlay) {
      this.createOverlay(target as HTMLElement);
      const contentHost = document.createElement('div');
      contentHost.className = 'lumina-overlay-content';

      let loaderContent: HTMLElement;
      const type = this.opts.type || 'spinner';

      if (type === 'image' && this.opts.image) {
        loaderContent = this.createImageElement();
      } else if (type === 'progress') {
        this.renderProgress(contentHost);
        loaderContent = contentHost.querySelector(
          '.lumina-progress',
        ) as HTMLElement;
      } else if (type === 'dots') {
        loaderContent = this.createDotsLoader();
      } else if (type === 'bars') {
        loaderContent = this.createBarsLoader();
      } else if (type === 'pulse') {
        loaderContent = this.createPulseLoader();
      } else if (type === 'gradient-ring') {
        loaderContent = this.createGradientRingLoader();
      } else if (type === 'orbit') {
        loaderContent = this.createOrbitLoader();
      } else if (type === 'wave') {
        loaderContent = this.createWaveLoader();
      } else {
        loaderContent = document.createElement('div');
        loaderContent.className = 'lumina-spinner';
      }

      if (type !== 'progress') {
        const loader = document.createElement('div');
        loader.className = `lumina-loader lumina-${type}`;
        loader.appendChild(loaderContent);
        contentHost.appendChild(loader);
      }

      if (this.opts.text) {
        const textEl = document.createElement('div');
        textEl.className = 'lumina-text';
        textEl.textContent = this.opts.text;
        contentHost.appendChild(textEl);
      }

      if (this.overlayEl) this.overlayEl.appendChild(contentHost);
      this.container = this.overlayEl;
    } else {
      const type = this.opts.type || 'spinner';
      let loaderContent: HTMLElement;

      if (type === 'image' && this.opts.image) {
        loaderContent = this.createImageElement();
      } else if (type === 'progress') {
        this.renderProgress(el);
        loaderContent = el.querySelector('.lumina-progress') as HTMLElement;
      } else if (type === 'dots') {
        loaderContent = this.createDotsLoader();
      } else if (type === 'bars') {
        loaderContent = this.createBarsLoader();
      } else if (type === 'pulse') {
        loaderContent = this.createPulseLoader();
      } else if (type === 'gradient-ring') {
        loaderContent = this.createGradientRingLoader();
      } else if (type === 'orbit') {
        loaderContent = this.createOrbitLoader();
      } else if (type === 'wave') {
        loaderContent = this.createWaveLoader();
      } else {
        loaderContent = document.createElement('div');
        loaderContent.className = 'lumina-spinner';
      }

      if (type !== 'progress') {
        const loader = document.createElement('div');
        loader.className = `lumina-loader lumina-${type}`;
        loader.appendChild(loaderContent);
        el.appendChild(loader);
      }

      if (typeof this.opts.size === 'number')
        el.style.setProperty('--lumina-size', `${this.opts.size}px`);
      if (typeof this.opts.color === 'string')
        el.style.setProperty('--lumina-color', this.opts.color);
      if (typeof this.opts.speed === 'number')
        el.style.setProperty('--lumina-spin-speed', `${this.opts.speed}s`);

      let resolvedTarget: HTMLElement | null = null;
      try {
        if (typeof this.opts.target === 'string') {
          const q = document.querySelector(this.opts.target);
          if (q instanceof HTMLElement) resolvedTarget = q;
        } else if (this.opts.target instanceof HTMLElement) {
          resolvedTarget = this.opts.target;
        }
      } catch (e) {
        void e;
      }

      if (!resolvedTarget && typeof document !== 'undefined' && document.body) {
        resolvedTarget = document.body;
      }

      if (resolvedTarget && this.hasAppendChild(resolvedTarget)) {
        resolvedTarget.appendChild(el);
      } else if (typeof document !== 'undefined' && document.body) {
        document.body.appendChild(el);
      } else {
        console.warn(
          'LuminaLoader: unable to mount loader — no valid mount root found.',
        );
      }

      this.container = el;
    }
  }

  show() {
    if (!this.container) this.mount();
    this.container?.setAttribute('aria-hidden', 'false');

    if (this.overlayEl) {
      const target =
        typeof this.opts.target === 'string'
          ? document.querySelector(this.opts.target)
          : (this.opts.target ?? document.body);
      if (target instanceof HTMLElement)
        target.setAttribute('aria-busy', 'true');

      const contentHost = this.overlayEl.querySelector(
        '.lumina-overlay-content',
      );
      if (contentHost instanceof HTMLElement) {
        if (typeof this.opts.size === 'number')
          contentHost.style.setProperty('--lumina-size', `${this.opts.size}px`);
        if (typeof this.opts.color === 'string')
          contentHost.style.setProperty('--lumina-color', this.opts.color);
        if (typeof this.opts.speed === 'number')
          contentHost.style.setProperty(
            '--lumina-spin-speed',
            `${this.opts.speed}s`,
          );
      }

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
      roleEl.querySelector('.lumina-progress-bar')
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
