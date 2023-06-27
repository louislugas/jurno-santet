import { s as supabase } from "../../../../chunks/db.js";
async function load({ params, cookies }) {
  let id = params.id;
  let room;
  try {
    room = JSON.parse(cookies.get(id));
    console.log(room);
    const { data } = await supabase.from("players").update({ inRoom: true }).eq("playerName", room.name).eq("roomId", params.id);
  } catch (error) {
    console.log(error, "load page.server.js");
  }
  return {
    you: room
  };
}
export {
  load
};
