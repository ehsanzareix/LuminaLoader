import type { StorybookConfig } from '@storybook/react-vite';
import vue from '@vitejs/plugin-vue';

const config: StorybookConfig = {
  // Only pick up component stories; exclude docs folder stories file that causes indexer issues
  stories: [
    '../src/**/!(*docs)/**/*.stories.@(tsx|jsx|mdx)',
    '../src/docs/**/*.mdx',
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-docs'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(vue());
    return config;
  },
};

export default config;
