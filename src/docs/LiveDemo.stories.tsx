import type { Meta, StoryObj } from '@storybook/react';
import { LiveDemo } from './LiveDemo';

const types = [
  'spinner',
  'dots',
  'bars',
  'pulse',
  'gradient-ring',
  'orbit',
  'wave',
  'image',
  'progress',
] as const;

const meta: Meta<typeof LiveDemo> = {
  title: 'Documentation/Design Tokens/Live Demo',
  component: LiveDemo,
  args: {
    type: 'spinner',
    size: 48,
    color: '#4fa94d',
    speed: 1,
    theme: 'auto',
  },
  argTypes: {
    type: { control: { type: 'select', options: types } },
    size: { control: { type: 'number', min: 16, max: 200, step: 1 } },
    color: { control: 'color' },
    speed: { control: { type: 'number', min: 0.1, max: 5, step: 0.1 } },
    theme: { control: { type: 'radio', options: ['auto', 'light', 'dark'] } },
  },
};

export default meta;

type Story = StoryObj<typeof LiveDemo>;

export const Live: Story = {};
