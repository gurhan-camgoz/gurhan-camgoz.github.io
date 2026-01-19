import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cspPlugin from './vite-plugin-csp'

export default defineConfig({
  plugins: [react(), cspPlugin()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  base: '/',
})
