<script>
	import { store } from './store.svelte.js';
	import Message from './Message.svelte';
</script>

<h3 class="mb-3">Messages</h3>

{#each store.messages as message (message.id)}
	<Message {message} />
{:else}
	<p class="text-muted">No messages yet</p>
{/each}
