<script>
// @ts-nocheck

    import supabase from '$lib/db'
    import role from '$lib/role'
    import { page } from '$app/stores'
	import { onDestroy, onMount } from 'svelte';
    import * as d3 from 'd3'
	import { redirect } from '@sveltejs/kit';
	import { goto, invalidateAll } from '$app/navigation';
    import VisibilityChange from "svelte-visibility-change";

	export let data
    /**
	 * @type {{ players: any; }[] | null}
	 */
    let rooms = [], arrId = 0, allready = false, players = [], selected = 0, readyPlayer = 0

    const { you, ip } = data
    console.log(ip, "ip")
    console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,you, "you")

    async function getArrId(p) {
        if (p) {
            try {
                console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,you, "you")
                console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,you.roomId, "you roomId")
                // const { data } = await supabase
                //     .from("rooms")
                //     .select("id, roomId, roomName, players(foreignId, playerName, isReady, role)")
                //     .eq("roomId", you.roomId);
                // @ts-ignore
                // console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,players, "players inside getArrId()")
                arrId = players.map((d) => d.playerName).indexOf(you.name)
            } catch (error) {
                console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,error, "getArrId() error room page.svelte")
            }
        }
    }

    async function getData() {
        try {
            const { data } = await supabase
                .from("rooms")
                .select("id, roomId, roomName)")
                .eq("roomId", $page.params.id)

            const {data : dataplayers} = await supabase
                .from("players")
                .select("playerName, roomId, isReady, inRoom, isLeader, role, id")
                .eq("inRoom", true)
                .eq("roomId", $page.params.id)

            players = dataplayers.sort((a,b) => a.id - b.id)
            
            // console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,players, "getData players")
            rooms = data

            if (players) {
                await getArrId(players)
            }
            
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,rooms, "getData() rooms")
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,players, "getData() players")
        } catch (error) {
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,error, "getData() error")
        }
    }

    onMount(async() => {
        await getData()
    })

    async function ready() {
        //// console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,rooms[0].players[arrId].isReady)
        try {
            const { data: dataisready, error } = await supabase
                .from('players')
                // @ts-ignore
                .update({ isReady: players[arrId].isReady ? false : true })
                .eq('playerName', you.name)
                .eq('roomId', $page.params.id)

            await getData()
            

        } catch (error) {
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,error, "ready()")
        }

        readyPlayer = players.filter(d => d.isReady)
    }

    async function joinRoom(key) {
        try {
            await supabase
                .from('players')
                // @ts-ignore
                .update({ inRoom: true })
                .eq('playerName', key)
                .eq('roomId', $page.params.id)
            await getData()
        } catch (error) {
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,error, "joinRoom()")
        }
    }

    async function leaveRoom(key) {
        try {
            const { data: dataisready, error } = await supabase
                .from('players')
                // @ts-ignore
                .update({ inRoom: false, isReady: false })
                .eq('playerName', key)
                .eq('roomId', $page.params.id)
            await getData()

            // console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,)
        } catch (error) {
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,error, "leaveRoom()")
        }
    }
    
    async function sahibSelect(e) {
        // console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,e.target.checked ? "selected" : "unselected")
        try {
            const { data: dataisready, error } = await supabase
                .from('players')
                // @ts-ignore
                .update({ isLeader: e.target.checked })
                .eq('playerName', e.target.dataset.name)
                .eq('roomId', $page.params.id)

            await getData()

        } catch (error) {
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,error, "ready()")
        }

        await getData()
        
        selected = players.filter(d => d.isLeader)        
    }

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    async function gameStart() {
        let rand = Math.floor(Math.random()*role.length)
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,role[rand])
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,players.length)

        //sahib
        let sahib = players.filter(d => d.isLeader)
        let sahibId = players.map(d => d.id).indexOf(sahib[0].id)
        players.splice(sahibId, 1)
        players.sort((a,b) => a.id - b.id)
        sahib[0].role = "sahib"
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,sahib, "sahib")
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,sahibId, "sahib Id")
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,players)

        //detective
        let detect = players.splice(Math.floor(Math.random()*players.length),1)
        players.sort((a,b) => a.id - b.id)
        detect[0].role = "detektif"
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,detect, "detective")
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,players)

        //dukun
        let dukun = players.splice(Math.floor(Math.random()*players.length),1)
        players.sort((a,b) => a.id - b.id)
        dukun[0].role = "dukun"
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,dukun, "dukun")
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,players)

        //sisa warga
        //randomly select theme
        let place = role[Math.floor(Math.random()*role.length)]
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,place)
        let loc = place.loc
        let roleList = place.role
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,roleList)
        shuffle(roleList)
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,roleList, "shuffled")

        players.forEach((d,i) => {
            d.role = roleList[i]
        })

        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,players, "added role")

        // join all role
        let allRole = sahib.concat(detect, dukun, players)
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,allRole, "before foreach")

        // set all role in database
        allRole.forEach( async (d) => {
            try {
                const { data: updaterole, error } = await supabase
                    .from('players')
                    // @ts-ignore
                    .update({ role: d.role, inGame: true })
                    .eq('roomId', d.roomId)
                    .eq('id', d.id)
                    .eq('playerName', d.playerName)

            } catch (error) {
                // console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,error, "ready()")
            }
        })

        // set game started
        try {
            const { data, error } = await supabase
                .from('rooms')
                // @ts-ignore
                .update({ isStart: true, location: loc })
                .eq('roomId', $page.params.id)

        } catch (error) {
            // console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,error, "ready()")
        }

        goto(`/game/${$page.params.id}`)
        
    }

    $: if (players.length >= 5 && selected.length == 1 && readyPlayer.length == players.length ) {
        allready = true
    } else {
        allready = false
    }

    const channel = supabase.channel(`player-status-${$page.params.id}`, {
        config: {
            presence: { key: data.you.name }
        }
    })


    channel
        .on(
            'postgres_changes',
            {
                event:'*',
                schema:'public',
                table:'players'
            },
            async (payload) => {
                await getData()
                await getArrId()
                console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,payload, "payload")
                // invalidateAll()
            }
        )
        .on('presence', { event: 'sync' }, async () => {
            const state = channel.presenceState()
            await getData()
            await getArrId()
            
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,state, "state")
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,typeof(players))
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,[players].length, "total players in the room")
            
        })
        .on('presence', { event: 'join' }, async ({ key, newPresences }) => {
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,key, newPresences, "join")
            let keyRole = newPresences[0].role
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,key, "key")
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,newPresences[0].user, "user")
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,keyRole, "keyRole")
            await joinRoom(key)
        })
        .on('presence', { event: 'leave' }, async ({ key, leftPresences }) => {
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,key, leftPresences, "leave")
            let keyRole = leftPresences[0].role
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,key, "key")
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,leftPresences[0].user, "user")
            console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,keyRole, "keyRole")
            await leaveRoom(key)
        })
        .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                const presenceTrackStatus = await channel.track({
                    user: data.you.name,
                    role: data.you.role,
                    id: data.you.id,
                    online_at: new Date().toISOString(),
                })
                // console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,presenceTrackStatus)
            }
        })



</script>

{#if rooms[0]}
<!-- <VisibilityChange 
    on:visible={() => joinRoom(you.name)}
    on:hidden={() => leaveRoom(you.name)}
/> -->

<pre>Room Name</pre>
<h1>{rooms[0].roomName ? rooms[0].roomName : ""}</h1>
<pre>Room ID</pre>
<h1>{rooms[0].roomId ? rooms[0].roomId.toUpperCase() : ""}</h1>
<br>

<pre>You:</pre>
<h1 style:margin-bottom="0">{you.name}</h1>
{#if players}
<button
    style:margin-top="0.5rem" 
    style:margin-bottom="1rem" 
    on:click|preventDefault={ready}>{players[arrId].isReady ? "Unready" : "Ready"}</button>
{/if}

<!-- <pre>Role:</pre>
<h1 style:margin-bottom="0">{players[arrId].role}</h1>
<br> -->

<pre>Link:</pre>
<h3 style:margin-bottom="0">jurno-santet.vercel.app/join/{$page.params.id}</h3>
<br><br>

<button disabled={!allready} on:click={gameStart}>Start!</button>
<br><br>

<pre>Players List</pre>
{#if players.length > 0}
{#each players as player, i}
<div class="player">
    <h3>{player.playerName}</h3>
    <!-- <input 
        class="lead-check-input" 
        data-name={player.playerName} 
        id="lead-{i}" 
        type="checkbox" 
        on:change={sahibSelect}
        disabled={selected.length == 1 && !player.isLeader}
        checked={player.isLeader}>
    <label class="lead-check-label" for="lead-{i}">Sahib</label>  -->
    <h3 
        style:color={player.isReady ? "green" : "red"}
        style:font-family="monospace">{player.isReady ? "Ready" : "Not Ready"}</h3>
</div>
{:else}
<div class="player">
    <h3>No player in this room</h3>
</div>
{/each}
{/if}
{/if}



<style>
	h1, h3, label {
		font-family: sans-serif;
		margin:0;
	}
    /* Hide the checkbox */
    input[type="checkbox"] {
        display: none;
    }

    /* Style the label to look like a button */
    label {
        display: flex;
        width:70px;
        height:30px;
        align-items:center;
        justify-content:center;
        background-color: orangered;
        color: white;
        cursor: pointer;
    }

    /* Style the label when the checkbox is checked */
    input[type="checkbox"]:checked + label {
        background-color: forestgreen;
    }

    /* Style the label when the checkbox is checked */
    input[type="checkbox"]:disabled + label {
        background-color: lightgray;
        cursor:not-allowed;
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