# lumina-loader-vue

## 0.0.3

### Patch Changes

- [#31](https://github.com/ehsanzareix/LuminaLoader/pull/31) [`d02312f`](https://github.com/ehsanzareix/LuminaLoader/commit/d02312fa3f5a62d582c9d0344078f89a0b8e68e2) Thanks [@ehsanzareix](https://github.com/ehsanzareix)! - Avoid DTS and SFC transformation at package build time: add per-package tsup configs to disable d.ts generation and treat `.vue` imports as external so that releases don't fail during DTS builds. We'll add better SFC/DTS support later.

- [#29](https://github.com/ehsanzareix/LuminaLoader/pull/29) [`a9e3982`](https://github.com/ehsanzareix/LuminaLoader/commit/a9e398216ae677ca9fab8acac4af23f0f5202309) Thanks [@ehsanzareix](https://github.com/ehsanzareix)! - Temporarily disable generation of TypeScript declaration files for Vue and Svelte adapter packages to avoid DTS/rollup errors during releases; will re-enable with proper SFC DTS support.

## 0.0.2

### Patch Changes

- [#27](https://github.com/ehsanzareix/LuminaLoader/pull/27) [`a0dc09b`](https://github.com/ehsanzareix/LuminaLoader/commit/a0dc09b71c769de46b8be56a4fe847d3173f1ecb) Thanks [@ehsanzareix](https://github.com/ehsanzareix)! - Ensure adapter packages build during publish (prepare/prepack) and include `src/` SFCs as a fallback so published packages contain runtime entries (fixes missing `dist/` in published packages).

## 0.0.1

### Patch Changes

- [#23](https://github.com/ehsanzareix/LuminaLoader/pull/23) [`fd4cbfb`](https://github.com/ehsanzareix/LuminaLoader/commit/fd4cbfba834d1cc77e7eb8a94796dd3997a1553e) Thanks [@ehsanzareix](https://github.com/ehsanzareix)! - Add initial `lumina-loader-vue` adapter package (initial patch release).
