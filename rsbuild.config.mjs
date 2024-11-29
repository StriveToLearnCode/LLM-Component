import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginSass } from '@rsbuild/plugin-sass';

import path from 'path';

export default defineConfig({
  // 配置路径别名
  source: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [pluginVue(), pluginSass()],
});
