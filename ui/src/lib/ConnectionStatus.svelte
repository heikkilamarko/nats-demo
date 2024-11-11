<script>
	import { store } from './store.svelte.js';
</script>

<span
	class="badge txt text-bg-success"
	class:text-bg-light={!store.isConnected}
	class:text-bg-success={store.isConnected}>{store.connectionStatus}</span
>
