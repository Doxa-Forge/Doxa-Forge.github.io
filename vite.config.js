import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Ensure all routes work with static hosting
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})

