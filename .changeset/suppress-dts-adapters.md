---
'lumina-loader-vue': patch
'lumina-loader-svelte': patch
---

Temporarily disable generation of TypeScript declaration files for Vue and Svelte adapter packages to avoid DTS/rollup errors during releases; will re-enable with proper SFC DTS support.
