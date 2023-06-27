<script>
    export let data;

    export let form;

	let pass = "", 
        id = "",
        player = ""

    $: console.log(data)
</script>

<h1>Join Room</h1>
<section>
    <form method="POST">
        <div>
            <h3>{data.roomId}</h3>
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
{#if form?.success == false}
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