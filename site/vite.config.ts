import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Build output goes to ../public so the local PowerShell server (server.ps1,
// http://localhost:8080) serves the production site with zero extra tooling.
// `base: './'` keeps asset URLs relative so the site works on any static host.
// When deploying to Vercel (VERCEL env var is set), output to the repository
// root dist/ so the Vercel static-build distDir aligns exactly with it.
const isVercel = !!process.env.VERCEL
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    outDir: isVercel ? '../dist' : '../public',
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 900,
  },
  server: {
    // During `vite dev` the contact form still works: proxy /api to server.ps1
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})