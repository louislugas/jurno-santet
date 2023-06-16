import supabase from '$lib/db'

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, cookies}) => {
        const formdata = await request.formData()
        
        let id = formdata.get("room-id")
        let pass = formdata.get("room-password")
        let player = formdata.get("player-name")

        async function readId() {
            let {data: player_data, error: player_error} = await supabase
                .from("rooms")
                .select("id, pass")
                .eq("roomId", id)

            return player_data
        }

        /**
         * @param {any} foreignId
         */
        async function createPlayer(foreignId) {
            let {data: playerdata, error: playererror} = await supabase
                .from("players")
                .insert([{
                    foreignId:foreignId,
                    roomId:id,
                    role:"player",
                    playerName: player,
                    isReady: false,
                }])
        }

        let passData = await readId()

        async function runFunctions() {
            try {   
                const playerData = await readId();
                
                // @ts-ignore
                await createPlayer(playerData[0].id);
                
            } catch (error) {
              // Handle errors
              console.error(error);
            }
        }

        // @ts-ignore
        if(passData[0].pass == pass) {
            // @ts-ignore
            cookies.set(id, JSON.stringify({
                "role": "player",
                "roomId": id,
                "name": typeof(player) == "string" ? player : ""
                } 
            ))
            runFunctions();

            console.log(pass, id, player)
        } else {
            cookies.set("passError", "true")
        }
        
        
    }
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	// @ts-ignore
	let passError = cookies.get("passError")
	
	return {
        passError: passError == "true" ? true : false
    }
}