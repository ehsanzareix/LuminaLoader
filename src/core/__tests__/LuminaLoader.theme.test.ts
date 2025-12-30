import { describe, it, expect, afterEach, vi } from 'vitest';
import { createLoader } from '../../api';

describe('LuminaLoader - theme', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('applies explicit dark theme to overlay', () => {
    const loader = createLoader({
      target: document.body,
      type: 'spinner',
      overlay: true,
      theme: 'dark',
    });
    loader.show();
    const overlay = document.querySelector('.lumina-overlay') as HTMLElement;
    expect(overlay).toBeTruthy();
    expect(overlay?.getAttribute('data-lumina-theme')).toBe('dark');
    loader.destroy();
  });

  it('resolves auto theme using matchMedia', () => {
    // mock matchMedia to simulate dark mode
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
    }));
    const loader = createLoader({
      target: document.body,
      type: 'spinner',
      overlay: true,
      theme: 'auto',
    });
    loader.show();
    const overlay = document.querySelector('.lumina-overlay') as HTMLElement;
    expect(overlay?.getAttribute('data-lumina-theme')).toBe('dark');
    loader.destroy();
  });
});
