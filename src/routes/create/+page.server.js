import supabase from '$lib/db'
import { redirect } from '@sveltejs/kit';

let char = "abcdefghijklmnopqrstuvwxyz0123456789".split("");
	
function createId() {
    let chars = []
    for(let i = 0; i < 6;i++) {
        let a = Math.round(Math.random()*char.length)
        chars.push(char[a])
    }
    let b = chars.join("")
    return b
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request, cookies}) => {
        const formdata = await request.formData()
        let name = formdata.get("room-name")
        let pass = formdata.get("room-password")
        let playername = formdata.get("sahib-name")

        let id = createId()

        cookies.set(id, JSON.stringify({
            "roomId": id,
            "name": typeof(playername) == "string" ? playername : ""
            } 
        ), {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 3
          })

        let c = cookies.getAll()
        console.log(c, "c")
        let d = (c
            .filter(d => d.value.includes("roomId")))
            .map(d => JSON.parse(d.value))
            .filter(d => d.roomId != id )
        console.log(d, "cookies check d")
        d.forEach(e => {
            console.log(e, "e");
            cookies.set(e.roomId, '', {
                httpOnly: true,
                path: '/',
                maxAge: 0
              })
        })

        async function readId() {
            let {data: roomdata, error: roomerror} = await supabase
                .from("rooms")
                .insert([{
                    roomName:name,
                    roomId:id,
                    pass:pass
                }])

            let {data: player_data, error: player_error} = await supabase
                .from("rooms")
                .select("id")
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
                    playerName: playername,
                    isReady: false,
                }])
        }

        async function runFunctions() {
            try {   
                const playerData = await readId();
                // @ts-ignore
                console.log(playerData[0].id)
                // @ts-ignore
                await createPlayer(playerData[0].id);
            } catch (error) {
              // Handle errors
              console.error(error);
            }
            if (id) {
                throw redirect(303, `/room/${id}`)
            }
            
        }

        await runFunctions();

        console.log(name, pass, id, playername)
        
    }
};