<script>
	import { fly } from 'svelte/transition';

	let { messages } = $props();
</script>

{#snippet messageCard(message)}
	<pre class="p-2 border rounded" transition:fly={{ x: 200, duration: 800 }}>{JSON.stringify(
			message.data,
			null,
			2
		)}</pre>
{/snippet}

<h3 class="mb-3">Messages</h3>

{#each messages as message (message.id)}
	{@render messageCard(message)}
{:else}
	<p class="text-muted">No messages yet</p>
{/each}
