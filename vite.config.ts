import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Leading dot allows any trycloudflare.com tunnel, since the subdomain changes on every run.
  server: { allowedHosts: ['.trycloudflare.com'] },
})
