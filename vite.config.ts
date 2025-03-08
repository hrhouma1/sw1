/// <reference types="node" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/v1': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => `/api${path}`,
        headers: {
          'Origin': 'http://localhost:8085'
        },
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Origin', 'http://localhost:8085');
          });
        }
      }
    }
  }
})
