/// <reference types="vite/client" />

// Allow imports like: import img from 'figma:asset/xxxx.png'
declare module 'figma:asset/*' {
  const src: string;
  export default src;
}