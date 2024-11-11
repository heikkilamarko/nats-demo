<script>
	import { store } from './store.svelte.js';
</script>

{#if store.error}
	<span class="badge txt text-bg-danger">{store.error}</span>
{/if}
