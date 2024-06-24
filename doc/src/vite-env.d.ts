/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  [key: string]: any
  codeOutputList: Array<any>
}

declare interface Console {
  originalLog: (...data: any[]) => void
  originalDir: (item?: any, options?: any) => void
  originalError: (...data: any[]) => void
}

declare module '*.js' {
  export default any
}