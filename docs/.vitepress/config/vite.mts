export const viteConfig = {
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
}
