<script>
	import { page } from "$app/stores";
</script>

<h1>This game is not started yet</h1>
<p><a href="/room/{$page.params.id}">Go back</a> to your waiting room</p>

<style>
    h1, p {
        font-family: sans-serif;
    }

    a:link, a:visited, a:active {
		color:orangered;
		font-family:sans-serif;
		text-decoration:none;
	}
</style>