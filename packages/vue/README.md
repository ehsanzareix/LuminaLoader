# lumina-loader-vue 🔌

Vue adapter for Lumina Loader — a thin component wrapper that mounts the loader and forwards common options as props.

## Install

npm install lumina-loader-vue

(or)

pnpm add lumina-loader-vue

## Usage (Vue 3)

```vue
<template>
  <div>
    <!-- inline -->
    <LuminaLoaderVue type="spinner" :size="48" color="#0070f3" />

    <!-- overlay -->
    <LuminaLoaderVue overlay :show="loading" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LuminaLoaderVue } from 'lumina-loader-vue';

const loading = ref(true);
</script>
```

## Props

- `show?: boolean` — whether the loader is visible (default: `true`).
- `container?: HTMLElement | string` — DOM node or selector to mount into. If omitted, mounts inline into a wrapper element.
- `overlay?: boolean` — when true the loader will mount to `document.body` (component renders only when not overlay).
- Loader options (`type`, `size`, `color`, `speed`, `theme`, `progress`, `progressVariant`) are accepted and forwarded to the core loader.

## Logo usage

Use the `image` loader type to display a logo:

```vue
<!-- URL image -->
<LuminaLoaderVue type="image" image="/logo.svg" />

<!-- Import as URL and use -->
<script setup lang="ts">
import logoUrl from './logo.svg';
</script>

<template>
  <LuminaLoaderVue type="image" :image="logoUrl" />
</template>
```

Note: the `image` prop accepts a URL string or an inline `SVGElement`.

## Notes

- Emits `show` and `hide` events when the loader visibility changes.
- The inline host uses the class `lumina-loader-host`.

---

Feedback or additions welcome — open an issue or PR if you want more examples.