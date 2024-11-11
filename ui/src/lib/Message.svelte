<script>
	import { fly } from 'svelte/transition';

	let { message } = $props();
</script>

<div class="mb-3 p-2 border rounded" in:fly={{ x: 200, duration: 400 }}>
	<div class="sender fw-bold mb-2">{message.user}</div>
	<div class="text-muted text-break">{message.text}</div>
</div>
