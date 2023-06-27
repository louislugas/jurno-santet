import { c as create_ssr_component } from "../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-1bqpqdz{font-family:sans-serif}a.svelte-1bqpqdz:link,a.svelte-1bqpqdz:visited,a.svelte-1bqpqdz:active{color:orangered;font-family:sans-serif;text-decoration:none}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1 class="svelte-1bqpqdz">Front Page</h1>
<a href="/create" class="svelte-1bqpqdz">Create Room</a><br><br>
<a href="/join" class="svelte-1bqpqdz">Join Room</a><br><br>
<a href="/room" class="svelte-1bqpqdz">Room List</a>`;
});
export {
  Page as default
};
