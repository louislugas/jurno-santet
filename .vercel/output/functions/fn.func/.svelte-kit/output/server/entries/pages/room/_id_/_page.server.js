import "../../../../chunks/db.js";
async function load({ params, cookies }) {
  let id = params.id;
  let room = JSON.parse(cookies.get(id));
  return {
    you: room
  };
}
export {
  load
};
