import type { Meta, StoryObj } from '@storybook/react';
import { LuminaLoaderReact } from './LuminaLoader';

const meta: Meta<typeof LuminaLoaderReact> = {
  title: 'Adapters/React/LuminaLoader',
  component: LuminaLoaderReact,
};

export default meta;

type Story = StoryObj<typeof LuminaLoaderReact>;

export const Spinner: Story = {
  args: { type: 'spinner', show: true, size: 48, speed: 1 },
  argTypes: {
    size: { control: { type: 'range', min: 16, max: 200 } },
    speed: { control: { type: 'number', min: 0.2, max: 5, step: 0.1 } },
    color: { control: 'color' },
  },
};

export const ImageRotate: Story = {
  args: {
    type: 'image',
    image:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="100%" height="100%" fill="%23f3f4f6"/><circle cx="40" cy="40" r="24" fill="%234fa94d"/></svg>',
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
