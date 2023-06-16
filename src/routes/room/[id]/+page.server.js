import supabase from '$lib/db'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
	let id = params.id
	// @ts-ignore
	let room = JSON.parse(cookies.get(id))
		
	return {
		you: room
	};
	
}