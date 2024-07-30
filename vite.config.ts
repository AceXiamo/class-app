import { defineConfig } from 'vite'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

const isH5 = process.env.UNI_PLATFORM === 'h5'
const isApp = process.env.UNI_PLATFORM === 'app'
const WeappTailwindcssDisabled = isH5 || isApp
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss-webpack-plugin/vite'
// 配置@别名
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    server: {
      hmr: true,
      // 端口号
      port: env.VITE_PORT as unknown as number,
      host: '0.0.0.0',
      // 本地跨域代理
      proxy: {
        ['/app']: {
          target: env.VITE_BASE_URL,
          ws: false,
          changeOrigin: true,
        },
      },
    },
    build: {
      emptyOutDir: true,
      sourcemap: true,
      minify: 'terser',
      terserOptions:
        mode === 'production'
          ? {
              compress: {
                drop_debugger: true,
                // 发布时删除 console
                drop_console: true,
              },
            }
          : {},
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
  }
})
