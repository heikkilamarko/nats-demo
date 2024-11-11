<script>
	import { fly } from 'svelte/transition';

	let { message } = $props();
</script>

<div class="mb-3 px-3 py-2 border rounded" in:fly={{ x: 200, duration: 400 }}>
	<div class="sender fw-bold">{message.user}</div>
	<div class="text-muted text-break">{message.text}</div>
</div>
