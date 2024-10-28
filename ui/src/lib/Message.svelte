<script>
	import { fly } from 'svelte/transition';

	let { message } = $props();
</script>

<pre class="p-2 border rounded" transition:fly={{ x: 200, duration: 800 }}>{JSON.stringify(
		message.data,
		null,
		2
	)}</pre>
