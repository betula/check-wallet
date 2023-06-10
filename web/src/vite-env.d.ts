/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_CLERK_PUBLISHABLE_KEY: string
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'react-middle-truncate';