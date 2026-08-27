import type { DefineComponent } from 'vue';
import type { LoaderOptions } from 'lumina-loader';

export type LuminaVueProps = Omit<LoaderOptions, 'target'> & {
  show?: boolean;
  container?: HTMLElement | string;
};

export const LuminaLoaderVue: DefineComponent<LuminaVueProps>;
