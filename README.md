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

*Note: this line was added to test the commit-msg hook.*
