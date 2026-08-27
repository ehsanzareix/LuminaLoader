<template>
  <div v-if="!overlay" ref="host" class="lumina-loader-host"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue';
import { createLoader } from 'lumina-loader';
import type { LoaderOptions } from 'lumina-loader';

interface Props {
  show?: boolean;
  container?: HTMLElement | string;
  type?: 'spinner' | 'dots' | 'bars' | 'pulse' | 'gradient-ring' | 'orbit' | 'wave' | 'image' | 'progress';
  size?: number;
  color?: string;
  speed?: number;
  overlay?: boolean | 'fullscreen' | 'inline';
  overlayZIndex?: number;
  backdrop?: { opacity?: number; blur?: string; color?: string; clickToClose?: boolean };
  ariaLabel?: string;
  image?: string | SVGElement;
  imageAnimation?: 'rotate' | 'pulse' | 'scale' | 'bounce';
  theme?: 'auto' | 'light' | 'dark';
  progress?: number;
  progressVariant?: 'linear' | 'circular';
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
});

const emit = defineEmits<{
  show: [];
  hide: [];
}>();

let loader: ReturnType<typeof createLoader> | null = null;
const host = ref<HTMLElement | null>(null);
function mountLoader() {
  if (loader) return;

  const hostIsConnected = !!(
    host.value && (host.value as HTMLElement).isConnected
  );

  const targetEl =
    props.container ?? (hostIsConnected ? host.value : document.body);

  const finalTarget =
    props.overlay && !props.container ? document.body : targetEl;

  loader = createLoader({
    ...(props as LoaderOptions),
    target: finalTarget,
  });

  if (props.show) {
    loader.show();
    emit('show');
  }
}

function destroyLoader() {
  if (!loader) return;
  loader.destroy();
  loader = null;
}

onMounted(() => {
  mountLoader();
});

onBeforeUnmount(() => {
  destroyLoader();
});

// Watch show prop changes
watch(
  () => props.show,
  (newValue) => {
    if (!loader) {
      mountLoader();
      return;
    }

    if (newValue) {
      loader.show();
      emit('show');
    } else {
      loader.hide();
      emit('hide');
    }
  },
);

// Watch for other prop changes - recreate loader if needed
watch(
  () => ({
    type: props.type,
    size: props.size,
    color: props.color,
    speed: props.speed,
    overlay: props.overlay,
    theme: props.theme,
    progress: props.progress,
    progressVariant: props.progressVariant,
  }),
  () => {
    destroyLoader();
    mountLoader();
  },
  { deep: true },
);
</script>

<style scoped>
.lumina-loader-host {
  display: contents;
}
</style>
