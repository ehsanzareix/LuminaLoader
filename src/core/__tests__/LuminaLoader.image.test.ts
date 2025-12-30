import { describe, it, expect, afterEach } from 'vitest';
import { createLoader } from '../../api';

describe('LuminaLoader - image', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('mounts and renders an image loader with rotate animation', () => {
    const loader = createLoader({ target: document.body, type: 'image', image: 'https://example.com/logo.png', size: 64, imageAnimation: 'rotate' });
    loader.show();
    const root = document.querySelector('.lumina-root');
    expect(root).toBeTruthy();
    const img = document.querySelector('.lumina-image');
    expect(img).toBeTruthy();
    const wrapper = document.querySelector('.lumina-image-wrapper');
    expect(wrapper?.classList.contains('lumina-rotate')).toBe(true);
    loader.destroy();
    expect(document.querySelector('.lumina-root')).toBeNull();
  });
});
