# LuminaLoader

Lightweight, framework-agnostic loader with custom logo support.

Quick start

```html
<script type="module">
  import { createLoader } from 'lumina-loader';
  const loader = createLoader({ target: '#app', size: 64 });
  loader.show();
  setTimeout(() => loader.hide(), 2000);
</script>
```

See `demo/` for a minimal example.

### Image / logo loader

Use the `image` type to show a custom image or logo as a loader. Pass an `image` URL or an inline `SVGElement`. Example:

```ts
import { createLoader } from 'lumina-loader';
const loader = createLoader({
  target: '#app',
  type: 'image',
  image: '/logo.svg',
  size: 80,
  imageAnimation: 'rotate',
});
loader.show();
```

Supported `imageAnimation` values: `rotate`, `pulse`, `scale`.

### Determinate progress

LuminaLoader supports determinate progress in `linear` or `circular` variants. Example:

```ts
const loader = createLoader({
  target: '#app',
  type: 'progress',
  progressVariant: 'linear',
  progress: 30,
  size: 200,
});
loader.show();
loader.setProgress(50);
```

### Overlay & backdrop

Show the loader as a full-screen overlay with a backdrop and focus trapping:

```ts
const loader = createLoader({
  target: '#app',
  type: 'spinner',
  overlay: true,
  backdrop: { opacity: 0.6, clickToClose: true },
});
loader.show();
```

Options:

- `overlay`: `true` | `'fullscreen'` | `'inline'` (default `true` shows fullscreen)
- `backdrop`: `{ opacity, blur, color, clickToClose }`
- `overlayZIndex`: number

### React (adapter)

A thin React wrapper is available that reuses the core engine. It mounts the loader and destroys it on unmount. Example:

````tsx
import React from 'react';
import { LuminaLoaderReact } from 'lumina-loader/src/adapters/react/LuminaLoader';

export default function App() {
  return (
    <LuminaLoaderReact
      type="image"
      image="/logo.svg"
      imageAnimation="rotate"
      show={true}
    />
  );
}

### Vue (adapter)

A thin Vue 3 wrapper is also available and reuses the core engine. Example:

```vue
<template>
  <LuminaLoader :type="'image'" image="/logo.svg" :show="true" />
</template>

<script setup lang="ts">
import LuminaLoader from 'lumina-loader/src/adapters/vue/LuminaLoader.vue';
</script>
````

```

```
