import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Output directory for assets, relative to the build output directory (dist by default)
    assetsDir: 'assets',
  },
  base: '/', // Base public path when serving the project
});
