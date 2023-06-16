import "../../../../chunks/db.js";
async function load({ params, cookies }) {
  let id = params.id;
  let room;
  try {
    room = JSON.parse(cookies.get(id));
    console.log(room);
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
