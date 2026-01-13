import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ensure all routes work with static hosting
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})

