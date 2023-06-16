import { s as supabase } from "../../../chunks/db.js";
async function load({}) {
  const { data } = await supabase.from("rooms").select("*");
  return {
    rooms: data ?? []
  };
}
export {
  load
};
