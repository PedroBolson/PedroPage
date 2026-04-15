import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'react-vendor', test: /node_modules\/(react|react-dom)\// },
            { name: 'motion',       test: /node_modules\/motion\// },
            { name: 'i18n',         test: /node_modules\/(react-i18next|i18next(-browser-languagedetector)?)\// },
            { name: 'particles',    test: /node_modules\/@tsparticles\// },
            { name: 'parallax',     test: /node_modules\/react-scroll-parallax\// },
          ],
        },
      },
    },
  },
})
