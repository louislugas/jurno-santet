import * as server from '../entries/pages/room/_page.server.js';

export const index = 5;
export const component = async () => (await import('../entries/pages/room/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/room/+page.server.js";
export const imports = ["_app/immutable/nodes/5.5088ab92.js","_app/immutable/chunks/index.a6332fa3.js"];
export const stylesheets = ["_app/immutable/assets/5.848f602e.css"];
export const fonts = [];
