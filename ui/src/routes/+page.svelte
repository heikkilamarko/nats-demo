<script>
	import '../app.scss';
	import { store } from '$lib/store.svelte.js';
	import ConnectionStatus from '$lib/ConnectionStatus.svelte';
	import ErrorMessage from '$lib/ErrorMessage.svelte';
	import MessageList from '$lib/MessageList.svelte';

	function handleConnect(event) {
		event.preventDefault();
		store.connect();
	}

	function handlePublishMessage(event) {
		event.preventDefault();
		store.publishMessage();
	}
</script>

<main class="container">
	<h1>{store.title}</h1>

	<ConnectionStatus />
	<ErrorMessage />

	<div class="row g-3 my-3">
		<div class="col-12 col-md-6">
			<form class="input-group" onsubmit={handleConnect}>
				<input
					type="password"
					name="token"
					class="form-control"
					placeholder="type auth token"
					autocomplete="off"
					bind:value={store.token}
				/>
				<button class="btn btn-outline-secondary" type="submit" disabled={!store.canConnect}
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
					autocomplete="off"
					bind:value={store.user}
				/>
			</div>
		</div>

		<div class="col-12">
			<form class="input-group" onsubmit={handlePublishMessage}>
				<input
					type="text"
					name="message"
					class="form-control"
					placeholder="type message"
					autocomplete="off"
					bind:value={store.message}
				/>
				<button class="btn btn-outline-secondary" type="submit" disabled={!store.canPublishMessage}
					>Send</button
				>
			</form>
		</div>
	</div>

	<div class="row g-3 my-3">
		<div class="col">
			<MessageList />
		</div>
	</div>
</main>
