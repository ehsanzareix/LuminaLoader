declare module '*.svelte' {
  import { SvelteComponentTyped } from 'svelte';
  // Avoid generic `Component` name to prevent duplicate identifier issues
  export default class SvelteComponent extends SvelteComponentTyped<
    Record<string, unknown>,
    Record<string, unknown>,
    unknown
  > {}
}
