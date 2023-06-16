<script>
	let pass = "", 
        name = "",
        sahib = ""
</script>

<h1>Create Room</h1>
<section>
	<form method="POST">
		<div>
			<label for="room-name">Room Name: </label>
			<input name="room-name" type="text" bind:value={name} required>
		</div>
		<div>
			<label for="room-password">Password: </label>
			<input name="room-password" type="password" bind:value={pass}  minlength="6" required>
		</div>
        <div>
			<label for="sahib-name">Nama: </label>
			<input name="sahib-name" type="text" bind:value={sahib} required>
		</div>
		<button>Create</button>
	</form>	
</section>

<style>
	h1 {
		font-family:sans-serif;
	}
	label {
		font-family:sans-serif;
	}
</style>