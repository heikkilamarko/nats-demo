<script>
	let { message } = $props();
</script>

{#if message}
	<span class="badge txt text-bg-danger">{message}</span>
{/if}
