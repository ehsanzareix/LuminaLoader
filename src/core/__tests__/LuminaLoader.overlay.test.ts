import { describe, it, expect, afterEach } from 'vitest';
import { createLoader } from '../../api';

describe('LuminaLoader - overlay', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('mounts overlay and backdrop with aria attributes and traps focus', () => {
    const target = document.body;
    const btn = document.createElement('button');
    btn.textContent = 'outside';
    document.body.appendChild(btn);

    const loader = createLoader({
      target,
      type: 'spinner',
      overlay: true,
      backdrop: { clickToClose: true, opacity: 0.6 },
    });
    loader.show();

    const overlay = document.querySelector('.lumina-overlay') as HTMLElement;
    expect(overlay).toBeTruthy();
    const backdrop = document.querySelector('.lumina-backdrop') as HTMLElement;
    expect(backdrop).toBeTruthy();
    expect(backdrop.style.opacity).toBe('0.6');

    // active element should be inside overlay (focused or overlay itself)
    expect(
      document.activeElement === overlay ||
        overlay.contains(document.activeElement as Node),
    ).toBe(true);

    // clicking backdrop should hide when clickToClose true
    backdrop.click();
    expect(document.querySelector('.lumina-overlay')).toBeNull();
  });
});
