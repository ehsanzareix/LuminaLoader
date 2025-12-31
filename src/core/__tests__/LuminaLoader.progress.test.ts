import { describe, it, expect, afterEach } from 'vitest';
import { createLoader } from '../../api';

describe('LuminaLoader - progress', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders linear progress and updates value', () => {
    const loader = createLoader({
      target: document.body,
      type: 'progress',
      progressVariant: 'linear',
      progress: 25,
    });
    loader.show();
    const bar = document.querySelector('.lumina-progress-bar') as HTMLElement;
    expect(bar).toBeTruthy();
    expect(bar.style.width).toBe('25%');
    loader.setProgress(60);
    expect(bar.style.width).toBe('60%');
    loader.destroy();
    expect(document.querySelector('.lumina-root')).toBeNull();
  });

  it('renders circular progress and updates value', () => {
    const loader = createLoader({
      target: document.body,
      type: 'progress',
      progressVariant: 'circular',
      progress: 40,
      size: 48,
    });
    loader.show();
    const circle = document.querySelector(
      '.lumina-progress-circle',
    ) as SVGElement;
    expect(circle).toBeTruthy();
    // stroke-dashoffset should not equal full circumference (i.e., not 0)
    const dash = Number(circle.getAttribute('stroke-dashoffset'));
    expect(dash).toBeGreaterThan(0);
    loader.setProgress(80);
    const dash2 = Number(circle.getAttribute('stroke-dashoffset'));
    expect(dash2).toBeLessThan(dash);
    loader.destroy();
  });
});
