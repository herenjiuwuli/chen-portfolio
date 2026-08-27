import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    // 老坑：safe-delete 拦截 dist 清空导致构建失败，这里关掉清空
    emptyOutDir: false,
  },
})
