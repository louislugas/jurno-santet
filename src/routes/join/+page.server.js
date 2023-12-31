import supabase from '$lib/db'
import { redirect, fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, cookies}) => {
        const formdata = await request.formData()
        // @ts-ignore
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
            // delete all possible players with same name and roomid
            await supabase
                .from("players")
                .delete()
                .eq("roomId", id)
                .eq("playerName", player)

            // insert new player into database
            await supabase
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
                await readId();
                
            } catch (error) {
              // Handle errors
              console.error(error);
            }
            
            
        }



        // @ts-ignore
        if(passData[0].pass == pass) {
            await runFunctions()
            
            // @ts-ignore
            cookies.set(id, JSON.stringify({
                "role": "player",
                "roomId": id,
                "name": typeof(player) == "string" ? player : ""
                }
            ), {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 3
                })
        
            let c = cookies.getAll()
            let d = (c
                .filter(d => d.value.includes("roomId")))
                .map(d => JSON.parse(d.value))
                .filter(d => d.roomId != id )
            console.log(d, "cookies check +page.server.js /join")
            d.forEach(d => {
                cookies.set(d.roomId, '', {
                    httpOnly: true,
                    path: '/',
                    maxAge: 0
                })
            })

            console.log(pass, id, player)
            if (id) {
                throw redirect(303, `/room/${id}`)
            }
            return { 
                success: true,
            }           
            
        } else {
            return { 
                success: false
            }
        }

        
        
    }
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params }) {

}