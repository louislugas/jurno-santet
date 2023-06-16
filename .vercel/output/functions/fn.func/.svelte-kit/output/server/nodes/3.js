import * as server from '../entries/pages/create/_page.server.js';

export const index = 3;
export const component = async () => (await import('../entries/pages/create/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/create/+page.server.js";
export const imports = ["_app/immutable/nodes/3.c59998c3.js","_app/immutable/chunks/index.a6332fa3.js"];
export const stylesheets = ["_app/immutable/assets/3.a3c0190a.css"];
export const fonts = [];
