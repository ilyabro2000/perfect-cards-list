/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig, type PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isStatsMode = mode === 'stats';
  return {
    base: 'perfect-cards-list',
    plugins: [
      vue(),
      isStatsMode
        ? visualizer(
          {
            emitFile: true,
            filename: 'stats.html',
            template: 'treemap',
            gzipSize: true,
          },
        ) as PluginOption : null],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/main.scss";',
        },
      },
    },
    server: {
      port: 8080,
      host: true,
      fs: {
        allow: ['../'],
      },
    },
  };
});
