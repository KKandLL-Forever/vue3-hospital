import {fileURLToPath, URL} from 'url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "localhost",
    proxy: {
      '/api': {
        // target: 'https://api.github.com',
        target: 'http://172.16.7.51:8888',
        changeOrigin: true,
        rewrite: (path): string => {
          console.log(path, 'path')
          return path.replace(/^\/api/, '')
        }
      },
    }
  }
})
