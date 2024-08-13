import { defineConfig } from 'vite';
import { resolve } from 'path';
// import handlebars from 'vite-plugin-handlebars';

// // Import data from external files
// import indexData from './src/data/data.json';

export default defineConfig({
  // Plugins configurations
  plugins: [
    // handlebars({
    //   partialDirectory: [
    //     resolve(__dirname, './src/templates'),
    //     resolve(__dirname, './src/templates/partials'),
    //   ],
    //   context: indexData
    // })
  ],
  // Build configurations
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  }
});
