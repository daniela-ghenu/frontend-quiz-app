import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';

// Import data from external files
import quizzesData from './src/data/data.json' with { type: 'json' };

export default defineConfig({
  // Plugins configurations
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(import.meta.dirname, './src/templates'),
        resolve(import.meta.dirname, './src/templates/partials'),
      ],
      context: quizzesData
    })
  ],
  // Build configurations
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html')
      }
    }
  }
});