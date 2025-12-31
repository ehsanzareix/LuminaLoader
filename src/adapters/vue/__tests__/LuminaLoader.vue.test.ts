import { mount } from '@vue/test-utils';
import type { DefineComponent } from 'vue';
import LuminaLoader from '../LuminaLoader.vue';

describe('Vue adapter', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('mounts loader and cleans up on unmount', async () => {
    const wrapper = mount(
      LuminaLoader as unknown as DefineComponent<
        Record<string, unknown>,
        Record<string, unknown>
      >,
      {
        props: { type: 'spinner', show: true },
      },
    );
    expect(document.querySelector('.lumina-root')).toBeTruthy();
    await wrapper.unmount();
    expect(document.querySelector('.lumina-root')).toBeNull();
  });
});
