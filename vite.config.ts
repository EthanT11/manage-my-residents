import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/manage-my-residents/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}))
