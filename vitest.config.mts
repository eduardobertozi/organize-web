import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tsConfigPaths(), react()],
  test: {
    dir: './src',
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['html'],
      include: ['src/**/*'],
    },
    setupFiles: ['./setup-tests.ts'],
    exclude: ['./src/components/ui'],
  },
})
