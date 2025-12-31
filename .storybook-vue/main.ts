import type { StorybookConfig } from '@storybook/vue3';
import vuePlugin from '@vitejs/plugin-vue';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/vue3',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config, _options) {
    config.plugins = [...(config.plugins || []), vuePlugin()];
    return config;
  },
};

export default config;
