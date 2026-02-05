import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path' // You might need to install 'path' and '@types/node'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This maps '@' to your 'src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },
})