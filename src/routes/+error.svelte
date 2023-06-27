<script>
// @ts-nocheck

    import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';

    $: if($page.status == 500) {
        throw redirect(303, `/join/${$page.params.id}`)
    }
</script>

{#if $page.status == 404}
<h1 class="status">{$page.status}</h1>
{#if $page.params.id != undefined}
<h1>Game room <span>{$page.params.id}</span> not exist</h1>
{:else}
<h1>This page does not exist</h1>
{/if}
{:else}
<h1 class="status">{$page.status}</h1>
<h1>Unexpected Error</h1>
{/if}
<style>
    h1 {
        font-family: sans-serif;
        text-align: center;
    }
    .status {
        font-size: 10rem;
        margin-bottom: 0;
        color:orangered
    }
    span {
        font-family: monospace;
        background-color: lightgrey;
        padding:0 0.5rem;
        border-radius: 0.25rem;
    }
</style>