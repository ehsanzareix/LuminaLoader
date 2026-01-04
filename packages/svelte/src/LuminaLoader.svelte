<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { LoaderOptions } from '../../core/LuminaLoader';
  import { createLoader } from '../../api';

  export let show: boolean = true;
  export let container: HTMLElement | string | null = null;
  export let overlay: boolean = false;
  export let type: string = 'spinner';
  export let size: number | string = 32;
  export let color: string | undefined = undefined;
  export let speed: number | undefined = undefined;
  export let theme: string | undefined = undefined;
  export let progress: number | undefined = undefined;
  export let progressVariant: string | undefined = undefined;

  let host: HTMLElement | null = null;
  let loader: ReturnType<typeof createLoader> | null = null;

  function mountLoader() {
    if (loader) return;

    let targetEl: HTMLElement | null = null;
    if (container) {
      if (typeof container === 'string') {
        const q = document.querySelector(container);
        targetEl = q instanceof HTMLElement ? q : null;
      } else {
        targetEl = container as HTMLElement;
      }
    } else {
      targetEl = host;
    }

    const finalTarget: HTMLElement | string =
      overlay && !container ? document.body : (targetEl ?? document.body);

    loader = createLoader({
      type,
      size,
      color,
      speed,
      theme,
      progress,
      progressVariant,
      target: finalTarget as any,
    } as LoaderOptions);

    if (show) {
      loader.show();
    }
  }

  function destroyLoader() {
    if (!loader) return;
    loader.destroy();
    loader = null;
  }

  $: if (loader) {
    if (show) loader.show(); else loader.hide();
  }

  $: if (loader && (type || size || color || speed || theme || progress || progressVariant)) {
    // Recreate loader on option changes to pick up changes
    destroyLoader();
    mountLoader();
  }

  onMount(() => {
    mountLoader();
  });

  onDestroy(() => {
    destroyLoader();
  });
</script>

{#if !overlay}
  <div bind:this={host} class="lumina-loader-host"></div>
{/if}

<style>
  .lumina-loader-host {
    display: contents;
  }
</style>