import { c as create_ssr_component, d as add_attribute } from "../../../chunks/index2.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-1so5opa,p.svelte-1so5opa{font-family:sans-serif}.passError.svelte-1so5opa{background-color:antiquewhite;display:flex;color:red;border:red 2px solid;padding:0.5rem;justify-content:center;width:max-content}label.svelte-1so5opa{font-family:sans-serif}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  let pass = "", id = "", player = "";
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  $$result.css.add(css);
  return `<h1 class="svelte-1so5opa">Join Room</h1>
<section><form method="POST"><div><label for="room-id" class="svelte-1so5opa">Room ID</label>
            <input name="room-id" type="text" required${add_attribute("value", id, 0)}></div>
        <div><label for="room-password" class="svelte-1so5opa">Password</label>
            <input name="room-password" type="password" required${add_attribute("value", pass, 0)}></div>
        <div><label for="player-name" class="svelte-1so5opa">Nama: </label>
			<input name="player-name" type="text" required${add_attribute("value", player, 0)}></div>
        <button>Join</button></form></section>
${form?.success == false ? `<p class="passError svelte-1so5opa">Password Incorrect</p>` : ``}`;
});
export {
  Page as default
};
