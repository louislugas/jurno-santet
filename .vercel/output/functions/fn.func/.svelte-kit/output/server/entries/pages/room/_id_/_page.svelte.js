import { c as create_ssr_component, b as subscribe } from "../../../../chunks/index.js";
import { s as supabase } from "../../../../chunks/db.js";
import { p as page } from "../../../../chunks/stores.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-1x1vec1,h3.svelte-1x1vec1{font-family:sans-serif;margin-top:0}.player.svelte-1x1vec1{display:flex;width:50%;justify-content:space-between;align-items:center}pre.svelte-1x1vec1{color:orangered;margin:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  const channel = supabase.channel("player-status");
  channel.on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "players"
    },
    (payload) => {
      console.log(payload);
    }
  ).subscribe();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  $$unsubscribe_page();
  return `${``}`;
});
export {
  Page as default
};
