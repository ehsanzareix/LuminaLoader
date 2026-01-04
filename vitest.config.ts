import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [vue(), svelte()],
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['tests/visual/**', 'node_modules/**'],
  },
});
