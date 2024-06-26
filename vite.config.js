import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/callout': {
        // target:'http://172.16.218.181:8080',
        target: 'http://172.16.217.152:8000',
        changeOrigin: true,
        rewrite:(path) =>path.replace(/^\/callout/,'')
      },
      '/sensors_data': {
        // target:'http://172.16.218.181:8080',
        target: 'http://172.16.217.152:8000',
        changeOrigin: true,
      },
      
    }
  }
})
