import * as server from '../entries/pages/join/_page.server.js';

export const index = 4;
export const component = async () => (await import('../entries/pages/join/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/join/+page.server.js";
export const imports = ["_app/immutable/nodes/4.1c8f6b94.js","_app/immutable/chunks/index.a6332fa3.js"];
export const stylesheets = ["_app/immutable/assets/4.61de3d7c.css"];
export const fonts = [];
