import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
//https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/iso-master-log-register/',//,'/mahmood815-webdev'//
  server: {
    open: false
  }
})