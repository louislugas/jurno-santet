<script>
    import supabase from '$lib/db'
    import { page } from '$app/stores'

    export let data

    const { you, allPlayers, loc } = data

    let { day, night, isNight } = data

    async function next() {
        if (!isNight) {
            // day
            console.log("day change to night")
        } else {
            // night
            day++
            night++
            console.log("night change to day, next day")
        }
        //change isNight
        isNight = !isNight

         // change day-night data
         try {
            const { data, error } = await supabase
                .from('rooms')
                // @ts-ignore
                .update({ day: day, night:night, isNight: isNight })
                .eq('roomId', $page.params.id)
        } catch (error) {
            // console.log(error, "ready()")
        }
    }

    $: if(isNight) {
        document.body.classList.add("night")
    } else {
        document.body.classList.remove("night")
    }

    // @ts-ignore
    async function joinRoom(key) {
        try {
            const { data: dataisready, error } = await supabase
                .from('players')
                // @ts-ignore
                .update({ inGame: true })
                .eq('playerName', key)
                .eq('roomId', $page.params.id)
            // await getData()
        } catch (error) {
            // console.log(error, "joinRoom()")
        }
    }

    // @ts-ignore
    async function leaveRoom(key) {
        try {
            const { data: dataisready, error } = await supabase
                .from('players')
                // @ts-ignore
                .update({ inGame: false, isReady: false })
                .eq('playerName', key)
                .eq('roomId', $page.params.id)
            // await getData()

            // console.log()
        } catch (error) {
            // console.log(error, "leaveRoom()")
        }
    }

    const channel = supabase.channel(`room-status-${$page.params.id}`)

    channel
        .on(
            'postgres_changes',
            {
                event:'*',
                schema:'public',
                table:'rooms'
            },
            async (payload) => {
                console.log(payload.new)
            }
        )
        .on('presence', { event: 'sync' }, async () => {
            const state = channel.presenceState()
            // await getData()
            // await getArrId()
            console.log(allPlayers.length, "total players in the room")
            console.log(state, "state")
        })
        .on('presence', { event: 'join' }, async ({ key, newPresences }) => {
            console.log(key, newPresences, "join")
            let keyRole = newPresences[0].role
            console.log(key, "key")
            console.log(newPresences[0].user, "user")
            console.log(keyRole, "keyRole")
            await joinRoom(key)
        })
        .on('presence', { event: 'leave' }, async ({ key, leftPresences }) => {
            console.log(key, leftPresences, "leave")
            let keyRole = leftPresences[0].role
            console.log(key, "key")
            console.log(leftPresences[0].user, "user")
            console.log(keyRole, "keyRole")
            await leaveRoom(key)
        })
        .subscribe(async (status) => {
            if (status === 'SUBSCRIBED') {
                const presenceTrackStatus = await channel.track({
                    user: you.playerName,
                    role: you.role,
                    online_at: new Date().toISOString(),
                })
                // console.log(presenceTrackStatus)
            }
        })
</script>

<pre>You:</pre>
<h1 style:margin-bottom="0" style:color={isNight ? "white" : "black"}>{you.playerName}</h1>

<pre>Role:</pre>
<h1 style:margin-bottom="0" style:color={isNight ? "white" : "black"}>{you.role}</h1>
{#if you.role != "detektif" || you.role != "dukun"}
<pre>Location:</pre>
<h1 style:margin-bottom="0" style:color={isNight ? "white" : "black"}>{loc}</h1>
{/if}
<br>
<br>
{#if !isNight}
    <h3 style:color={isNight ? "white" : "black"}>Day {day}</h3>
{:else}
    <h3 style:color={isNight ? "white" : "black"}>Night {night}</h3>
{/if}
{#if you.role == "sahib"}
    <button on:click={next}>Next</button>

<br>
<br>
<pre style:color={isNight ? "white" : "black"}>All players debugger:</pre>
<br>
{#each allPlayers.sort((a,b) => a.id-b.id) as player}
    <pre>
        {player.id}. {player.playerName} - {player.role}
    </pre>
{/each}
{/if}

<style>
	h1, h3 {
		font-family: sans-serif;
		margin:0;
        margin-bottom: 4rem;
        color:black;
        transition: color 500ms ease-in-out;
	}
    h3 {
        margin-bottom:1rem;
    }
	pre {
		color:orangered;
		margin:0;
	}
    :global(body) {
        background-color: white;
        transition: background 500ms ease-in-out;
    }
    :global(body.night) {
        background-color: #1e1e1e;
    }
</style>
