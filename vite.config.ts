import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: 'docs',
  plugins: [react()],
  build: {
    outDir: '../docs-dist',
    emptyOutDir: true
  }
});


