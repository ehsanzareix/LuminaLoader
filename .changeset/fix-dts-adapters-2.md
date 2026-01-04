---
'lumina-loader-vue': patch
'lumina-loader-svelte': patch
---

Avoid DTS and SFC transformation at package build time: add per-package tsup configs to disable d.ts generation and treat `.vue` imports as external so that releases don't fail during DTS builds. We'll add better SFC/DTS support later.
