import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig({
  define: {
    __APP_ENV__: JSON.stringify(process.env.APP_ENV),
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [vue()],
})
