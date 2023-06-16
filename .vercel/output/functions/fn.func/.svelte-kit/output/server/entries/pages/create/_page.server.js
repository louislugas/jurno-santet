import { s as supabase } from "../../../chunks/db.js";
let char = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
function createId() {
  let chars = [];
  for (let i = 0; i < 6; i++) {
    let a = Math.round(Math.random() * char.length);
    chars.push(char[a]);
  }
  let b = chars.join("");
  return b;
}
const actions = {
  default: async ({ request, cookies }) => {
    const formdata = await request.formData();
    let name = formdata.get("room-name");
    let pass = formdata.get("room-password");
    let sahib = formdata.get("sahib-name");
    let id = createId();
    cookies.set(id, JSON.stringify(
      {
        "role": "sahib",
        "id": id,
        "name": typeof sahib == "string" ? sahib : ""
      }
    ));
    async function readId() {
      await supabase.from("rooms").insert([{
        roomName: name,
        roomId: id,
        pass
      }]);
      let { data: player_data, error: player_error } = await supabase.from("rooms").select("id").eq("roomId", id);
      return player_data;
    }
    async function createPlayer(foreignId) {
      await supabase.from("players").insert([{
        foreignId,
        roomId: id,
        role: "sahib",
        playerName: sahib,
        isReady: false
      }]);
    }
    async function runFunctions() {
      try {
        const playerData = await readId();
        console.log(playerData[0].id);
        await createPlayer(playerData[0].id);
      } catch (error) {
        console.error(error);
      }
    }
    runFunctions();
    console.log(name, pass, id, sahib);
  }
};
export {
  actions
};
