/// <reference types="vite/client" />

declare module '*.svg?raw' {
  const content: string
  export default content
}

declare module 'node:fs' {
  const fs: any
  export default fs
}

declare module 'node:path' {
  const path: any
  export default path
}



declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}