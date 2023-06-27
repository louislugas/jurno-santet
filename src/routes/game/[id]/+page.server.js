import supabase from '$lib/db'
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	let check, players, user
	let id = params.id
	/**
     * @type {{ name: any; }}
     */
	let room

	// check room id on database
	const { data : dataload } = await supabase
		.from('rooms')
		.select("*")
		.eq('roomId', params.id)
	check = dataload

    // get all players in room
    const { data : dataplayer } = await supabase
		.from('players')
		.select("id, role, playerName")
		.eq('roomId', params.id)
	players = dataplayer

	//if room exist on database
	if(check) {
		console.log(check, "room exist in database")

        //check if game already started
        if(check[0].isStart) {
            //game really started
            // check if cookies exist
            console.log(id, "id")
            if(cookies.get(id)) {
                // @ts-ignore
                room = JSON.parse(cookies.get(id))
                console.log(room, "room")

                // get only the user
                // @ts-ignore
                user = players.filter( d => d.playerName == room.name)[0]
                console.log(user, "user")
                
                return {
                    you: user,
                    allPlayers:players,
                    day: check[0].day,
                    night: check[0].night,
                    isNight: check[0].isNight,
                    loc: check[0].location
                };
            } else
            // check if cookies doesnt exist
            {
                console.log("redirected to join/")
                throw redirect(303, `/join/${id}`)
            }

        } else {
            //game apparently not started yet
            throw redirect(303, `/notyetstart/${id}`)
        }

		
	} else if (!check) {
		console.log("room not exist in database")
		throw error(404, {message: "Game room not existed"})
	}
		
	
	
}