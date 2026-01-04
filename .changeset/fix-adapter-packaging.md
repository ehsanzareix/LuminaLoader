---
'lumina-loader-react': patch
'lumina-loader-vue': patch
'lumina-loader-svelte': patch
---

Ensure adapter packages build during publish (prepare/prepack) and include `src/` SFCs as a fallback so published packages contain runtime entries (fixes missing `dist/` in published packages).
