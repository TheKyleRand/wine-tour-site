import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace base with repository name
export default defineConfig({
  base: '/wine-tour-site/',
  plugins: [react()],
});
