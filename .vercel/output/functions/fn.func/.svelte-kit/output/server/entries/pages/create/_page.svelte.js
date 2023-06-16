import { c as create_ssr_component, d as add_attribute } from "../../../chunks/index.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-1grxjhk{font-family:sans-serif}label.svelte-1grxjhk{font-family:sans-serif}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let pass = "", name = "", sahib = "";
  $$result.css.add(css);
  return `<h1 class="svelte-1grxjhk">Create Room</h1>
<section><form method="POST"><div><label for="room-name" class="svelte-1grxjhk">Room Name: </label>
			<input name="room-name" type="text" required${add_attribute("value", name, 0)}></div>
		<div><label for="room-password" class="svelte-1grxjhk">Password: </label>
			<input name="room-password" type="password" minlength="6" required${add_attribute("value", pass, 0)}></div>
        <div><label for="sahib-name" class="svelte-1grxjhk">Nama: </label>
			<input name="sahib-name" type="text" required${add_attribute("value", sahib, 0)}></div>
		<button>Create</button></form>	
</section>`;
});
export {
  Page as default
};
