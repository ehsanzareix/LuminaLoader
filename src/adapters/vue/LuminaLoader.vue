<template>
  <!-- Render a host element so the loader can mount inline inside Storybook / apps -->
  <div ref="host" />
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
const host = ref<HTMLElement | null>(null);

function mountLoader() {
  if (loader) return;
  const targetEl = props.container ?? host.value ?? document.body;
  const finalTarget =
    props.overlay && !props.container ? document.body : targetEl;
  loader = createLoader({
    ...(props as LoaderOptions),
    target: finalTarget,
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
