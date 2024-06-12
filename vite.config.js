import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/js-notebook/',  // base path should match your repository name
  // other configurations...
});
