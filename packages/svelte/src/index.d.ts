import type { Component } from 'svelte';
import type { LoaderOptions } from 'lumina-loader';

export type LuminaSvelteProps = Omit<LoaderOptions, 'target'> & {
  show?: boolean;
  container?: HTMLElement | string | null;
};

export const LuminaLoaderSvelte: Component<LuminaSvelteProps>;
