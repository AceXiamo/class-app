/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_PORT: number
  readonly VITE_BASE_URL: string
  readonly VITE_OPEN_LOG: boolean
  readonly VITE_UPLOAD_API: string
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
