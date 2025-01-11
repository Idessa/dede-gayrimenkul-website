/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly DIRECTUS_TOKEN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
