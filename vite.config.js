import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  /* Relative asset URLs ('./assets/…' rather than '/assets/…').
     A leading slash resolves against the SITE root, so the build only works if
     dist is itself the root — drop the folder one level deeper on a static host
     and every asset 404s, leaving unstyled HTML. Relative paths work either way. */
  base: './',
  server: {
    // the sibling IBA project holds 5180; strictPort so a clash fails loudly
    port: 5190,
    strictPort: true,
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // three is ~600kB and is loaded behind a lazy boundary, so keeping it
          // in its own chunk is what actually keeps it off the critical path
          three: ['three'],
          gsap: ['gsap', 'lenis'],
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
