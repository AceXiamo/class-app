import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const isH5 = process.env.UNI_PLATFORM === 'h5'
const isApp = process.env.UNI_PLATFORM === 'app'
const WeappTailwindcssDisabled = isH5 || isApp
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss-webpack-plugin/vite'
// 配置@别名
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
    sourcemap: process.env.NODE_ENV === 'development',
  },
  plugins: [uni(), WeappTailwindcssDisabled ? undefined : uvtw()],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
})
