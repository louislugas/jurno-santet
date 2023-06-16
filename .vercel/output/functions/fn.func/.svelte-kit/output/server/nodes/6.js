import * as server from '../entries/pages/room/_id_/_page.server.js';

export const index = 6;
export const component = async () => (await import('../entries/pages/room/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/room/[id]/+page.server.js";
export const imports = ["_app/immutable/nodes/6.808f6044.js","_app/immutable/chunks/index.a6332fa3.js","_app/immutable/chunks/preload-helper.41c905a7.js","_app/immutable/chunks/stores.1ee02582.js","_app/immutable/chunks/singletons.50d25255.js"];
export const stylesheets = ["_app/immutable/assets/6.4ce56903.css"];
export const fonts = [];
