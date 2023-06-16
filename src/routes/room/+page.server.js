import supabase from '$lib/db'

/** @type {import('./$types').PageServerLoad} */
export async function load({}) {
	const { data } = await supabase
		.from("rooms")
		.select("*");
	return {
		rooms: data ?? []
	};
}