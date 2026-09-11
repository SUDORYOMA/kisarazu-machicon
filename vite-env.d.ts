/// <reference types="vite/client" />

declare const __BASE_PATH__: string;

// Instagram 埋め込みSDK（embed.js）がグローバルに生やすオブジェクト
interface Window {
  instgrm?: { Embeds: { process: () => void } };
}
