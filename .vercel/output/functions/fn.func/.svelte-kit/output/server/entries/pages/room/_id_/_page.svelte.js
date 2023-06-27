import { c as create_ssr_component, b as subscribe, e as escape, g as add_styles, f as each } from "../../../../chunks/index2.js";
import { s as supabase } from "../../../../chunks/db.js";
import { p as page } from "../../../../chunks/stores.js";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "h1.svelte-1x1vec1,h3.svelte-1x1vec1{font-family:sans-serif;margin-top:0}.player.svelte-1x1vec1{display:flex;width:50%;justify-content:space-between;align-items:center}pre.svelte-1x1vec1{color:orangered;margin:0}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let you;
  let channel;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let rooms = [], arrId = 0, players = [];
  async function getArrId() {
    try {
      const { data: data2 } = await supabase.from("rooms").select("id, roomId, roomName, players(foreignId, playerName, isReady, role)").eq("roomId", you.roomId);
      arrId = data2[0].players.map((d) => d.playerName).indexOf(you.name);
    } catch (error) {
      console.log(error, "getArrId()");
    }
  }
  async function getData() {
    try {
      const { data: data2 } = await supabase.from("rooms").select("id, roomId, roomName, players(foreignId, playerName, isReady, role, inRoom)").eq("roomId", $page.params.id);
      players = data2[0].players.filter((d) => d.inRoom);
      rooms = data2;
      console.log(rooms, "getData()");
    } catch (error) {
      console.log(error, "getData() error");
    }
  }
  async function joinRoom(key) {
    try {
      const { data: dataisready, error } = await supabase.from("players").update({ inRoom: true }).eq("playerName", key).eq("roomId", $page.params.id);
      await getData();
      await getArrId();
    } catch (error) {
      console.log(error, "joinRoom()");
    }
  }
  async function leaveRoom(key) {
    try {
      const { data: dataisready, error } = await supabase.from("players").update({ inRoom: false, isReady: false }).eq("playerName", key).eq("roomId", $page.params.id);
      await getData();
      await getArrId();
      console.log();
    } catch (error) {
      console.log(error, "leaveRoom()");
    }
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  ({ you } = data);
  channel = supabase.channel("player-status", { config: { presence: { key: you.name } } });
  {
    channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "players"
      },
      async (payload) => {
        await getData();
        await getArrId();
        console.log(payload);
      }
    ).on("presence", { event: "sync" }, async () => {
      const state = channel.presenceState();
      await getData();
      await getArrId();
      console.log(state, "state");
    }).on("presence", { event: "join" }, async ({ key, newPresences }) => {
      console.log(key, newPresences, "join");
      await joinRoom(key);
    }).on("presence", { event: "leave" }, async ({ key, leftPresences }) => {
      console.log(key, leftPresences, "leave");
      await leaveRoom(key);
    }).subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const presenceTrackStatus = await channel.track({
          user: you.name,
          online_at: (/* @__PURE__ */ new Date()).toISOString()
        });
        console.log(presenceTrackStatus);
      }
    });
  }
  {
    console.log(rooms, "rooms");
  }
  $$unsubscribe_page();
  return `${rooms[0] ? `<pre class="svelte-1x1vec1">Room Name</pre>
    <h1 class="svelte-1x1vec1">${escape(rooms[0].roomName)}</h1>
    <pre class="svelte-1x1vec1">Room ID</pre>
    <h1 class="svelte-1x1vec1">${escape(rooms[0].roomId.toUpperCase())}</h1>
    <br>

    <pre class="svelte-1x1vec1">You:</pre>
    <h1 class="svelte-1x1vec1"${add_styles({ "margin-bottom": `0` })}>${escape(you.name)}</h1>
    <button${add_styles({ "margin-bottom": `4rem` })}>${escape(rooms[0].players[arrId].isReady ? "Unready" : "Ready")}</button>
    <br>

    <pre class="svelte-1x1vec1">Role:</pre>
    <h1 class="svelte-1x1vec1"${add_styles({ "margin-bottom": `0` })}>${escape(rooms[0].players[arrId].role)}</h1>

    <pre class="svelte-1x1vec1">Players List</pre>
    ${players.length ? each(players, (player) => {
    return `<div class="player svelte-1x1vec1"><h3 class="svelte-1x1vec1">${escape(player.playerName)}</h3>
        <h3 class="svelte-1x1vec1"${add_styles({
      "color": player.isReady ? "green" : "red",
      "font-family": `monospace`
    })}>${escape(player.isReady ? "Ready" : "Not Ready")}</h3>
    </div>`;
  }) : `<div class="player svelte-1x1vec1"><h3 class="svelte-1x1vec1">No in this room</h3>
    </div>`}
    ${``}` : ``}`;
});
export {
  Page as default
};
