<script>
	import { fly } from 'svelte/transition';
	import { formatMessage } from './utils.js';

	let { message } = $props();

	let formattedMessage = $derived(formatMessage(message.data));
</script>

<pre class="p-2 border rounded" in:fly={{ x: 200, duration: 400 }}>{formattedMessage}</pre>
