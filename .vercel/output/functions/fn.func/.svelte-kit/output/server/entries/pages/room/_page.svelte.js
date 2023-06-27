import { c as create_ssr_component, f as each, e as escape } from "../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-1epbkw{font-family:sans-serif}a.svelte-1epbkw{color:black;font-family:sans-serif}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let rooms;
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  ({ rooms } = data);
  return `<h1 class="svelte-1epbkw">Room List</h1>
${each(rooms, (room) => {
    return `<a href="${"/room/" + escape(room.roomId, true)}" class="svelte-1epbkw">${escape(room.roomName)}</a>
	<br>`;
  })}`;
});
export {
  Page as default
};
