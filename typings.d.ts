/// <reference types="zone.js" />
/// <reference types="meteor-typings" />

declare module '*.html' {
  const template: string;
  export default template;
}

declare module '*.scss' {
  const style: string;
  export default style;
}
