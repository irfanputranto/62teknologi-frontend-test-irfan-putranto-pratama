import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/v3': {
        target: 'https://api.yelp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v3/, ''),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        },
      }
    }
  }
})
