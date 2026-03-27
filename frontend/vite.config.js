import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      },
      manifest: {
        name: 'PathFinder | Skill Navigator',
        short_name: 'PathFinder',
        description: 'AI Driven Career Gap Analysis and Learning Path Master.',
        theme_color: '#4f46e5',
        background_color: '#fcfcfd',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: 'https://img.icons8.com/deco-color/144/compass.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'https://img.icons8.com/deco-color/512/compass.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true
      }
    }
  }
})
