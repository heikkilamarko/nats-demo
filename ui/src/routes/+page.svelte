<script>
	import '../app.scss';
	import { store } from '$lib/store.svelte.js';
	import ConnectionStatus from '$lib/ConnectionStatus.svelte';
	import MessageList from '$lib/MessageList.svelte';

	let canConnect = $derived(!!store.token);

	function handleSubmit(event) {
		event.preventDefault();
		store.connect();
	}
</script>

<main class="container">
	<h1>{store.title}</h1>

	<ConnectionStatus />

	<div class="row g-3 my-3">
		<div class="col-12 col-md-6">
			<form class="input-group" onsubmit={handleSubmit}>
				<input
					type="password"
					name="token"
					class="form-control"
					placeholder="type auth token"
					bind:value={store.token}
				/>
				<button class="btn btn-outline-secondary" type="submit" disabled={!canConnect}
					>Connect</button
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
			<MessageList />
		</div>
	</div>
</main>
