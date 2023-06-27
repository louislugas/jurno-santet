import supabase from '$lib/db'
import { redirect, error } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, cookies, params}) => {
        const formdata = await request.formData()
        
        let id = params.id
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
                "role":"player",
                "roomId": id,
                "name": typeof(player) == "string" ? player : ""
                }                
            ), {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 3
            })
            runFunctions();

            let c = cookies.getAll()
            let d = (c
                .filter(d => d.value.includes("roomId")))
                .map(d => JSON.parse(d.value))
                .filter(d => d.roomId != id )
            console.log(d, "cookies check")
            d.forEach(e => {
                // @ts-ignore
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
            return { success: true }
        } else {
            return { success: false }
        }    
        
    }
    
};

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies,params }) {
    let check

    try {
        const { data : dataload } = await supabase
            .from('rooms')
            .select("*")
            .eq('roomId', params.id)
        check = dataload
        console.log(check, "check")
    } catch (error) {
        console.log(error, "error load page.server.js")
    }

    // @ts-ignore
    if (check.length < 1) {
        throw error(404, {message: "Game room not existed"})
    } else {
        let a = cookies.get(params.id)

        return {
            name: a,
            roomId: params.id
        }
    }
}