import { s as supabase } from "../../../chunks/db.js";
import { r as redirect } from "../../../chunks/index.js";
const actions = {
  default: async ({ request, cookies }) => {
    const formdata = await request.formData();
    let id = formdata.get("room-id");
    let pass = formdata.get("room-password");
    let player = formdata.get("player-name");
    async function readId() {
      let { data: player_data, error: player_error } = await supabase.from("rooms").select("id, pass").eq("roomId", id);
      return player_data;
    }
    async function createPlayer(foreignId) {
      await supabase.from("players").insert([{
        foreignId,
        roomId: id,
        role: "player",
        playerName: player,
        isReady: false
      }]);
    }
    let passData = await readId();
    async function runFunctions() {
      try {
        const playerData = await readId();
        await createPlayer(playerData[0].id);
      } catch (error) {
        console.error(error);
      }
    }
    if (passData[0].pass == pass) {
      cookies.set(id, JSON.stringify(
        {
          "role": "player",
          "roomId": id,
          "name": typeof player == "string" ? player : ""
        }
      ));
      runFunctions();
      let c = cookies.getAll();
      let d = c.filter((d2) => d2.value.includes("role")).map((d2) => JSON.parse(d2.value)).filter((d2) => d2.roomId != id);
      console.log(d, "cookies check");
      d.forEach((d2) => cookies.delete(d2.roomId));
      console.log(pass, id, player);
      if (id) {
        throw redirect(303, `/room/${id}`);
      }
      return { success: true };
    } else {
      return { success: false };
    }
  }
};
async function load({ cookies, params }) {
}
export {
  actions,
  load
};
