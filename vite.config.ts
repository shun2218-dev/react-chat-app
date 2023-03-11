import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  base: './',
  server: {
    cors: {
      origin: ['https://react-chat-app-shun2218-dev.vercel.app/']
    }
  }
})
