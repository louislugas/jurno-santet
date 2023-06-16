import supabase from '$lib/db'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	let id = params.id
	let room
	try {
		// @ts-ignore
		room = JSON.parse(cookies.get(id))
		console.log(room)
	} catch (error) {
		console.log(error, "load page.server.js")
	}
		
	return {
		you: room,
	};
	
}