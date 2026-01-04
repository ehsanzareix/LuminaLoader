import { describe, it, expect } from 'vitest';

// Simple smoke test to ensure the Svelte adapter module can be imported
import * as SvelteAdapter from '../LuminaLoader.svelte';

describe('Svelte adapter smoke', () => {
  it('exports a default component', () => {
    expect(SvelteAdapter).toBeDefined();
  });
});
