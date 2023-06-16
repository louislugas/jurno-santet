<script>
    import supabase from '$lib/db'
    import { page } from '$app/stores'
	import { onMount } from 'svelte';

	export let data
    /**
	 * @type {{ players: any; }[] | null}
	 */
    let rooms = [], arrId = 0, allready = false

    $: ({ you } = data);
    //$: console.log(rooms, you, "front")

    // // @ts-ignore
    // $: arrId = rooms[0].players.map((d) => d.playerName).indexOf(you.name)

    async function getArrId() {
        try {
            const { data } = await supabase
                .from("rooms")
                .select("id, roomId, roomName, players(foreignId, playerName, isReady, role)")
                .eq("roomId", you.roomId);
            // @ts-ignore
            arrId = data[0].players.map((d) => d.playerName).indexOf(you.name)
        } catch (error) {
            console.log(error, "getArrId()")
        }
    }

    async function getData() {
        try {
            const { data } = await supabase
                .from("rooms")
                .select("id, roomId, roomName, players(foreignId, playerName, isReady, role)")
                .eq("roomId", $page.params.id);
            rooms = data    
        } catch (error) {
            console.log(error, "getData()")
        }
    }

    onMount(async() => {
        await getData()
        await getArrId()
    })

    async function ready() {
        //console.log(rooms[0].players[arrId].isReady)
        try {
            const { data: dataisready, error } = await supabase
                .from('players')
                // @ts-ignore
                .update({ isReady: rooms[0].players[arrId].isReady ? false : true })
                .eq('playerName', you.name)
                .eq('roomId', $page.params.id)
            await getData()
            await getArrId()
        } catch (error) {
            console.log(error, "ready()")
        }
    }

    const channel = supabase.channel('player-status')

    channel.on(
        'postgres_changes',
        {
            event:'*',
            schema:'public',
            table:'players'
        },
        (payload) => {
            console.log(payload)
        }
        ).subscribe()



</script>
{#if rooms[0]}
    <pre>Room Name</pre>
    <h1>{rooms[0].roomName}</h1>
    <pre>Room ID</pre>
    <h1>{rooms[0].roomId.toUpperCase()}</h1>
    <br>

    <pre>You:</pre>
    <h1 style:margin-bottom="0">{you.name}</h1>
    <button style:margin-bottom="4rem" on:click|preventDefault={ready}>{rooms[0].players[arrId].isReady ? "Unready" : "Ready"}</button>
    <br>

    <pre>Players List</pre>
    {#each rooms[0].players as player}
    <div class="player">
        <h3>{player.playerName}</h3>
        <h3 
            style:color={player.isReady ? "green" : "red"}
            style:font-family="monospace">{player.isReady ? "Ready" : "Not Ready"}</h3>
    </div>
    {/each}
    {#if allready}
    <h3>All Ready, Start Game!</h3>
    {/if}
{/if}


<style>
	h1, h3 {
		font-family: sans-serif;
		margin-top:0;
	}
    .player {
        display: flex;
        width: 50%;
        justify-content: space-between;
        align-items: center;
    }
	pre {
		color:orangered;
		margin:0;
	}
</style>