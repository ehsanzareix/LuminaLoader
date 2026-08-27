import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: false,
  format: ['esm', 'cjs'],
  clean: true,
  // Svelte's emitted component CSS already carries source-map metadata. Asking
  // esbuild to concatenate another CSS map leaves a malformed comment between
  // the global and component styles in the published file.
  sourcemap: false,
});
