import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Adding the React plugin
  build: {
    assetsDir: 'assets', // Define the directory for assets, relative to the output directory (default is 'dist')
  },
  base: '/', // Set the base public path when serving the project
});
