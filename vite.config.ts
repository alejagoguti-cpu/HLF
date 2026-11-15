import { defineConfig } from 'vite';

export default defineConfig({
  base: '/HLF/',
  build: {
    outDir: 'docs',
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 6000,
    rollupOptions: {
      output: {
        manualChunks: { cesium: ['cesium'] },
      },
    },
  },
  server: { port: 5173, host: '127.0.0.1' },
  preview: { port: 4173, host: '127.0.0.1' },
});
