<script>
	import { store } from '$lib/store.svelte.js';
	import Messages from '../lib/Messages.svelte';

	let canConnect = $derived(!!store.token);
</script>

<main class="container">
	<h1>{store.title}</h1>
	<span class="badge text-bg-light">{store.status}</span>

	<div class="row g-3 my-3">
		<div class="col-12 col-md-6">
			<form class="input-group">
				<input
					type="password"
					name="token"
					class="form-control"
					placeholder="type auth token"
					bind:value={store.token}
				/>
				<button
					class="btn btn-outline-secondary"
					type="submit"
					disabled={!canConnect}
					onclick={() => store.connect()}>Connect</button
				>
			</form>
		</div>

		<div class="col-12 col-md-6">
			<div class="input-group">
				<span class="input-group-text">@</span>
				<input
					type="text"
					name="user"
					class="form-control"
					placeholder="type your name"
					bind:value={store.user}
				/>
			</div>
		</div>
	</div>

	<div class="row g-3 my-3">
		<div class="col">
			<Messages messages={store.messages} />
		</div>
	</div>
</main>
