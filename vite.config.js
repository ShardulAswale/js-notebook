import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/js-notebook/',  // base path should match your repository name
  // other configurations...
});
