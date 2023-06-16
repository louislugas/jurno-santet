<script>
	export let data

    $: ({ rooms } = data);
</script>

<h1>Room List</h1>
{#each rooms as room}
	<a href="/room/{room.roomId}">{room.roomName}</a>
	<br>
{/each}

<style>
	h1 {
		font-family: sans-serif;
	}
	a {
		color: black;
		font-family: sans-serif;
	}
</style>