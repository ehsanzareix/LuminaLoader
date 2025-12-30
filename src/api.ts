import { LuminaLoader, LoaderOptions } from './core/LuminaLoader';

export function createLoader(options: LoaderOptions) {
  const l = new LuminaLoader(options);
  l.mount();
  return l;
}
