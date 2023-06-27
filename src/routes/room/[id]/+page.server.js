import supabase from '$lib/db'
import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies, getClientAddress }) {
	let ip = getClientAddress()
	console.log(ip, "ip")
	let check
	let id = params.id
	let room

	let c = cookies.getAll()
	console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, c, "c")
	let d = (c
		.filter(d => d.value.includes("roomId")))
		.map(d => JSON.parse(d.value))
		.filter(d => d.roomId != id )
	console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, d, "cookies check d")
	d.forEach(e => {
		console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, e, "e");
		cookies.set(e.roomId, '', {
			httpOnly: true,
			path: '/',
			maxAge: 0
		  })
	})

	// check room id on database
	const { data : dataload } = await supabase
		.from('rooms')
		.select("*")
		.eq('roomId', params.id)
	check = dataload
	// @ts-ignore

	//if room exist on database
	if(check) {
		console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, check, "room exist in database")
		// @ts-ignore
		room = JSON.parse(cookies.get(id))
		console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, room, "room")

		// check if cookies exist
		console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, id, "id")
		if(cookies.get(id)) {
			// @ts-ignore
			room = JSON.parse(cookies.get(id))
			console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, room, "room")

			await supabase
				.from('players')
				// @ts-ignore
				.update({ inRoom: true })
				.eq('playerName', room.name)
				.eq('roomId', params.id)

			if(check[0].isStart) {
				throw redirect(303, '/start')
			} else {
				return {
					you: room,
					ip: ip
				};
			}
		} else
		// check if cookies doesnt exist
		{
			console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, "redirected to join/")
			throw redirect(303, `/join/${params.id}`)
		}
	} else if (!check) {
		console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`, "room not exist in database")
		throw error(404, {message: "Game room not existed"})
	}
		
	
	
}