import { wsconnect } from '@nats-io/nats-core';
import { Kvm } from '@nats-io/kv';
import { createMessageId, getWsUrl, getSessionToken, setSessionToken } from './utils.js';

const DEFAULT_TITLE = 'NATS Demo';
const DEFAULT_THEME = 'dark';
const THEMES = ['dark', 'light'];

const STATUS_DISCONNECTED = 'disconnected';
const STATUS_DISCONNECTING = 'disconnecting...';
const STATUS_CONNECTING = 'connecting...';
const STATUS_CONNECTED = 'connected';
const STATUS_LAME_DUCK_MODE = 'server is transitioning to lame duck mode';
const STATUS_SERVER_ERROR = 'server error';

class AppStore {
	token = $state(getSessionToken());
	user = $state();
	title = $state(DEFAULT_TITLE);
	connectionStatus = $state(STATUS_DISCONNECTED);
	error = $state();
	messages = $state.raw([]);
	message = $state();
	isPublishing = $state(false);

	isConnected = $derived(this.connectionStatus === STATUS_CONNECTED);
	canConnect = $derived(!!store.token?.trim());
	canPublishMessage = $derived(this.isConnected && !!this.user?.trim() && !!this.message?.trim());

	#nc;
	#kv;

	async connect() {
		if (
			this.connectionStatus === STATUS_CONNECTING ||
			this.connectionStatus === STATUS_DISCONNECTING
		)
			return;

		try {
			await this.disconnect();

			this.connectionStatus = STATUS_CONNECTING;

			setSessionToken(this.token);

			this.#nc = await wsconnect({
				servers: getWsUrl('/ws'),
				name: 'ui',
				user: 'ui',
				pass: this.token,
				timeout: 120_000,
				maxReconnectAttempts: -1,
				waitOnFirstConnect: true
			});

			this.#monitor();
			this.#configure();
			this.#listenPing();
			this.#listenMessages();

			this.connectionStatus = STATUS_CONNECTED;
		} catch (err) {
			this.connectionStatus = STATUS_DISCONNECTED;
			this.error = err.message;
		}
	}

	async disconnect() {
		this.error = null;
		this.connectionStatus = STATUS_DISCONNECTING;
		try {
			await this.#nc?.drain();
		} catch {}
		this.#nc = null;
		this.#kv = null;
		this.connectionStatus = STATUS_DISCONNECTED;
	}

	async publishMessage() {
		if (!this.canPublishMessage) return;

		try {
			this.isPublishing = true;
			this.error = null;

			if (this.message === '/theme dark') {
				await this.#kv.put('theme', 'dark');
			} else if (this.message === '/theme light') {
				await this.#kv.put('theme', 'light');
			} else if (this.message?.startsWith('/title ')) {
				await this.#kv.put('title', this.message.slice(7));
			} else {
				await this.#nc.publish(
					'demo.messages',
					JSON.stringify({
						user: this.user?.trim(),
						text: this.message?.trim()
					})
				);
			}

			this.message = null;
		} catch (err) {
			this.error = err.message;
		} finally {
			this.isPublishing = false;
		}
	}

	async #monitor() {
		(async () => {
			for await (const s of this.#nc.status()) {
				this.#handleMonitorStatus(s);
			}
		})().catch((err) => (this.error = err.message));

		this.#nc.closed().then((err) => {
			if (err) this.error = err.message;
		});
	}

	async #configure() {
		const kvm = new Kvm(this.#nc);

		this.#kv = await kvm.create('demo');

		const kvTitle = await this.#kv.get('title');
		this.#setTitle(kvTitle?.string());

		const kvTheme = await this.#kv.get('theme');
		this.#setTheme(kvTheme?.string());

		const watch = await this.#kv.watch();

		(async () => {
			for await (const msg of watch) {
				this.#handleConfigure(msg);
			}
		})().catch((err) => (this.error = err.message));
	}

	#listenPing() {
		const sub = this.#nc.subscribe('demo.ping');

		(async () => {
			for await (const msg of sub) {
				this.#handlePing(msg);
			}
		})().catch((err) => (this.error = err.message));
	}

	#listenMessages() {
		const sub = this.#nc.subscribe('demo.messages');

		(async () => {
			for await (const msg of sub) {
				this.#handleMessage(msg);
			}
		})().catch((err) => (this.error = err.message));
	}

	#handleConfigure(msg) {
		switch (msg.key) {
			case 'title':
				this.#setTitle(msg.string());
				break;
			case 'theme':
				this.#setTheme(msg.string());
				break;
		}
	}

	#handlePing(msg) {
		msg.respond(this.user?.trim() || '<unknown>');
	}

	#handleMessage(msg) {
		const message = this.#parseMessage(msg);
		if (!message) return;

		this.messages = [message, ...this.messages].slice(0, 100);
	}

	#parseMessage(msg) {
		let message;
		let text = '<empty>';

		try {
			message = msg.json();
		} catch {
			text = msg.string() || text;
		}

		message ??= {};
		message.id = createMessageId();
		message.user ||= '<unknown>';
		message.text ||= text;

		return message;
	}

	#handleMonitorStatus(s) {
		switch (s.type) {
			case 'disconnect':
				this.connectionStatus = STATUS_DISCONNECTED;
				break;
			case 'reconnecting':
				this.connectionStatus = STATUS_CONNECTING;
				break;
			case 'reconnect':
				this.connectionStatus = STATUS_CONNECTED;
				break;
			case 'ldm':
				this.connectionStatus = STATUS_LAME_DUCK_MODE;
				break;
			case 'error':
				this.error = s.error?.name || STATUS_SERVER_ERROR;
				break;
		}
	}

	#setTitle(title) {
		this.title = title || DEFAULT_TITLE;
	}

	#setTheme(theme) {
		if (!theme || !THEMES.includes(theme)) theme = DEFAULT_THEME;
		document.documentElement.setAttribute('data-bs-theme', theme);
	}
}

const store = new AppStore();

if (store.token) store.connect();

export { store };
