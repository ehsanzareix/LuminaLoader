import { describe, it, expect, afterEach } from 'vitest';
import { createLoader } from '../../api';

describe('LuminaLoader', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('mounts and shows a loader', () => {
    const loader = createLoader({ target: document.body, size: 40 });
    loader.show();
    expect(document.querySelector('.lumina-root')).toBeTruthy();
    loader.destroy();
    expect(document.querySelector('.lumina-root')).toBeNull();
  });
});
