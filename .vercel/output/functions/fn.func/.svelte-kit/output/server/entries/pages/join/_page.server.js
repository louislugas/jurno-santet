import { s as supabase } from "../../../chunks/db.js";
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
      console.log(pass, id, player);
    } else {
      cookies.set("passError", "true");
    }
  }
};
async function load({ cookies }) {
  let passError = cookies.get("passError");
  return {
    passError: passError == "true" ? true : false
  };
}
export {
  actions,
  load
};
