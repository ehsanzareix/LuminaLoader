# Design tokens

This project exposes simple design tokens (CSS variables) to customize loader visuals.

Available tokens (defaults):

- `--lumina-color`: primary accent color (default `#4fa94d`)
- `--lumina-size`: default loader size (uses `--lumina-size-md` by default)
- `--lumina-size-sm|md|lg`: size presets
- `--lumina-border-width`: visual thickness of the spinner ring
- `--lumina-spin-speed`: rotation duration (e.g., `1s`)
- `--lumina-ease`: easing function for animations
- `--lumina-duration-*`: timing tokens for transitions

Usage examples:

- Per-instance (via `createLoader` options): `createLoader({ size: 80, color: '#ff0066' })` — these are applied as inline CSS variables on the loader container.
- Global (override in app):

```css
:root {
  --lumina-color: #ff0066;
  --lumina-size-md: 56px;
}
```

Accessibility note: animations respect `prefers-reduced-motion` and will be disabled automatically.
