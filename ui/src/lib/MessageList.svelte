<script>
	import { store } from './store.svelte.js';
	import Message from './Message.svelte';
</script>

<h2 class="h3 mb-3">Messages</h2>

{#each store.messages as message (message.id)}
	<Message {message} />
{:else}
	<p class="text-muted">No messages yet</p>
{/each}
