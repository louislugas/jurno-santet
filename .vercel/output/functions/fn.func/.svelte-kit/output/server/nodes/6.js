import * as server from '../entries/pages/room/_id_/_page.server.js';

export const index = 6;
export const component = async () => (await import('../entries/pages/room/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/room/[id]/+page.server.js";
export const imports = ["_app/immutable/nodes/6.b4d3557c.js","_app/immutable/chunks/index.a6332fa3.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/stores.054f25a8.js","_app/immutable/chunks/singletons.245bb4f3.js"];
export const stylesheets = ["_app/immutable/assets/6.4ce56903.css"];
export const fonts = [];
