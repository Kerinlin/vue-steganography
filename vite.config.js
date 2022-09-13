import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify } from 'unocss';
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    }),
    Unocss({
      presets: [presetUno(), presetAttributify()],
      rules: [
        // custom-margin
        [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}px` })],
        [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}px` })],
        [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}px` })],
        [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}px` })],
        [/^m-(\d+)$/, match => ({ margin: `${match[1]}px` })],
        // custom-padding
        [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}px` })],
        [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}px` })],
        [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}px` })],
        [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}px` })],
        [/^p-(\d+)$/, match => ({ padding: `${match[1]}px` })],
      ],
      shortcuts: {
        'init-btn': 'border-none cursor-pointer outline-none',
        'space-between': 'flex flex-row justify-between items-center',
        'flex-start': 'flex flex-row justify-start items-center',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 8082,
    https: false,
    open: true, //在服务器启动时自动在浏览器中打开应用程序
  },
});
