import type { Meta, StoryObj } from '@storybook/vue3';
import LuminaLoader from './LuminaLoader.vue';

const meta: Meta<typeof LuminaLoader> = {
  title: 'Adapters/Vue/LuminaLoader',
  component: LuminaLoader as any,
};

export default meta;

type Story = StoryObj<typeof LuminaLoader>;

export const Spinner: Story = {
  args: { type: 'spinner', show: true },
};

export const ImageRotate: Story = {
  args: {
    type: 'image',
    image: '/logo.svg',
    imageAnimation: 'rotate',
    size: 80,
    show: true,
  },
};

export const ProgressLinear: Story = {
  args: {
    type: 'progress',
    progressVariant: 'linear',
    progress: 45,
    size: 200,
    show: true,
  },
};

export const Overlay: Story = {
  args: {
    type: 'spinner',
    overlay: true,
    backdrop: { opacity: 0.5 },
    show: true,
  },
};
