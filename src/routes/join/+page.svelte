<script>
    export let data
    $:({ passError } = data)
    $: console.log(passError)
	let pass = "", 
        id = "",
        player = ""
</script>

<h1>Join Room</h1>
<section>
    <form method="POST">
        <div>
            <label for="room-id">Room ID</label>
            <input name="room-id" type="text" bind:value={id} required>
        </div>
        <div>
            <label for="room-password">Password</label>
            <input name="room-password" type="password" bind:value={pass} required>
        </div>
        <div>
			<label for="player-name">Nama: </label>
			<input name="player-name" type="text" bind:value={player} required>
		</div>
        <button>Join</button>
    </form>
</section>
{#if passError}
<p class="passError">Password Incorrect</p>
{/if}

<style>
	h1,p {
		font-family:sans-serif;
	}
    .passError {
        background-color: antiquewhite;
        display: flex;
        color:red;
        border: red 2px solid;
        padding:0.5rem;
        justify-content: center;
        width:max-content;
    }
	label {
		font-family:sans-serif;
	}
</style>