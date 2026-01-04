# lumina-loader-react 🔌

React adapter for Lumina Loader — small component wrapper that mounts the loader into the DOM and forwards common options.

## Install

npm install lumina-loader-react

(or)

pnpm add lumina-loader-react

## Usage (React)

```tsx
import React from 'react';
import { LuminaLoaderReact } from 'lumina-loader-react';

export default function App() {
  return (
    <div>
      {/* Inline loader mounted into the DOM */}
      <LuminaLoaderReact type="spinner" size={48} color="#0070f3" />

      {/* Overlay loader (mounted to document.body) */}
      <LuminaLoaderReact overlay show={true} />

      {/* Controlled example */}
      <ControlledExample />
    </div>
  );
}

function ControlledExample() {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <button onClick={() => setShow((s) => !s)}>{show ? 'Hide' : 'Show'} loader</button>
      <LuminaLoaderReact show={show} type="bar" progress={0.5} />
    </div>
  );
}
```

## Props

- `show?: boolean` — whether the loader is visible (default: `true`).
- `container?: HTMLElement | string` — DOM node or selector to mount into. If omitted, mounts inline into a wrapper element.
- `overlay?: boolean` — when true the loader will mount to `document.body` and the component renders `null` (useful for global overlays).
- `onShow?: () => void` / `onHide?: () => void` — lifecycle callbacks.
- All loader `options` such as `type`, `size`, `color`, `speed`, `theme`, `progress`, `progressVariant` are forwarded to the core loader.

## Logo usage

The core supports an `image` loader type to show a logo or custom image. Examples:

```tsx
// URL image
<LuminaLoaderReact type="image" image="/logo.svg" />

// Inline SVG (import as URL or SVG element)
import logoUrl from './logo.svg';
<LuminaLoaderReact type="image" image={logoUrl} />
```

Note: the `image` prop accepts a URL string or an inline `SVGElement`.

## Notes

- The adapter depends on the runtime core (already bundled in this monorepo). Use the published package at `lumina-loader-react` when consuming from npm.
- The inline host element has the class `lumina-loader-host` if you need to target it with styles.

---

Contributions welcome — open an issue or PR if you need additional examples or props documented.