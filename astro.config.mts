import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  integrations: [vue()],
  site: 'https://ayaskt.github.io',
  output: 'static',
  srcDir: './src',
  publicDir: './docs/public',
  build: {
    format: 'directory',
  },
  vite: {
    resolve: {
      alias: {
        vitepress: fileURLToPath(new URL('./src/runtime/vitepress.ts', import.meta.url)),
      },
    },
    server: {
      watch: {
        awaitWriteFinish: {
          stabilityThreshold: 10000,
          pollInterval: 1000,
        },
        ignored: [
          '**/.vitepress/cache/**',
          '**/.vitepress/dist/**',
          '**/*.attachments/**',
          '**/Attachments/**',
          '**/Assets/**',
          '**/Assests/**',
          '**/*_tmp.html',
          '**/.DS_Store',
          '**/superpowers/**',
        ],
      },
    },
  },
})
