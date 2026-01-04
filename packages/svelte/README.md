# lumina-loader-svelte 🔌

Svelte adapter for Lumina Loader — a small component wrapper that mounts the loader into the DOM and forwards common options as props.

## Install

npm install lumina-loader-svelte

(or)

pnpm add lumina-loader-svelte

## Usage (Svelte)

```svelte
<script lang="ts">
  import { LuminaLoaderSvelte } from 'lumina-loader-svelte';
  let loading = true;
</script>

<LuminaLoaderSvelte type="spinner" size={48} color="#0070f3" />

<!-- Overlay -->
<LuminaLoaderSvelte overlay={true} show={loading} />

<!-- Logo / image -->
<LuminaLoaderSvelte type="image" image="/logo.svg" />
```

## Props

- `show?: boolean` — whether the loader is visible (default: `true`).
- `container?: HTMLElement | string` — DOM node or selector to mount into. If omitted, mounts inline into a wrapper element.
- `overlay?: boolean` — when true the loader will mount to `document.body` and the component renders `null` (useful for global overlays).
- Loader options such as `type`, `size`, `color`, `speed`, `theme`, `progress`, `progressVariant` are forwarded to the core loader.

## Notes

- The inline host element has the class `lumina-loader-host` if you need to target it with styles.

---

Contributions welcome — open an issue or PR if you need additional examples or props documented.
