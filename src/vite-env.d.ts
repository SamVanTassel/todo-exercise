/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_DB_HOST: string
  readonly VITE_DB_USER: string
  readonly VITE_DB_PASSWORD: string
  readonly VITE_DB_DB: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}