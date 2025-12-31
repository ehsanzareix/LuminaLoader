<template>
  <!-- This component is headless and mounts the core loader; no DOM output required -->
  <div v-if="false"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, toRef } from 'vue';
import { createLoader } from '../../api';
import type { LoaderOptions } from '../../core/LuminaLoader';

interface Props extends Omit<LoaderOptions, 'target'> {
  show?: boolean;
  container?: HTMLElement | string;
}

const props = defineProps<Props>();

let loader: ReturnType<typeof createLoader> | null = null;

function mountLoader() {
  if (loader) return;
  loader = createLoader({
    ...(props as LoaderOptions),
    target: props.container ?? document.body,
  });
  if (props.show ?? true) loader.show();
}

function destroyLoader() {
  loader?.destroy();
  loader = null;
}

onMounted(() => {
  mountLoader();
});

onBeforeUnmount(() => {
  destroyLoader();
});

// react to `show` prop
watch(toRef(props, 'show'), (v) => {
  if (!loader) mountLoader();
  if (v) loader?.show();
  else loader?.hide();
});
</script>
