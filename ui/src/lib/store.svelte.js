import { wsconnect, Events } from '@nats-io/nats-core';
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
	status = $state(STATUS_DISCONNECTED);
	messages = $state.raw([]);
	message = $state();

	isConnected = $derived(this.status === STATUS_CONNECTED);
	canConnect = $derived(!!store.token);
	canPublishMessage = $derived(this.isConnected && !!this.user && !!this.message);

	#nc;

	async connect() {
		if (this.status === STATUS_CONNECTING || this.status === STATUS_DISCONNECTING) return;

		try {
			await this.disconnect();

			this.status = STATUS_CONNECTING;

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

			this.status = STATUS_CONNECTED;
		} catch (err) {
			this.status = err.message;
		}
	}

	async disconnect() {
		this.status = STATUS_DISCONNECTING;
		try {
			await this.#nc?.drain();
		} catch {}
		this.#nc = null;
		this.status = STATUS_DISCONNECTED;
	}

	async publishMessage() {
		if (!this.canPublishMessage) return;

		try {
			await this.#nc.publish(
				'demo.messages',
				JSON.stringify({
					id: createMessageId(),
					user: this.user,
					text: this.message
				})
			);
			this.message = null;
		} catch (err) {
			this.status = err.message;
		}
	}

	async #monitor() {
		(async () => {
			for await (const s of this.#nc.status()) {
				this.status = this.#parseMonitorStatus(s);
			}
		})().catch((err) => (this.status = err.message));

		this.#nc.closed().then((err) => {
			if (err) this.status = err.message;
		});
	}

	async #configure() {
		const kvm = new Kvm(this.#nc);
		const kv = await kvm.create('demo');

		const kvTitle = await kv.get('title');
		this.#setTitle(kvTitle?.string());

		const kvTheme = await kv.get('theme');
		this.#setTheme(kvTheme?.string());

		const watch = await kv.watch();

		(async () => {
			for await (const msg of watch) {
				this.#handleConfigure(msg);
			}
		})().catch((err) => (this.status = err.message));
	}

	#listenPing() {
		const sub = this.#nc.subscribe('demo.ping');

		(async () => {
			for await (const msg of sub) {
				this.#handlePing(msg);
			}
		})().catch((err) => (this.status = err.message));
	}

	#listenMessages() {
		const sub = this.#nc.subscribe('demo.messages');

		(async () => {
			for await (const msg of sub) {
				this.#handleMessage(msg);
			}
		})().catch((err) => (this.status = err.message));
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
		try {
			return msg.json();
		} catch {}

		return null;
	}

	#parseMonitorStatus(s) {
		switch (s.type) {
			case Events.Disconnect:
				return STATUS_DISCONNECTED;
			case Events.Reconnect:
				return STATUS_CONNECTED;
			case Events.LDM:
				return STATUS_LAME_DUCK_MODE;
			case Events.Error:
				return STATUS_SERVER_ERROR;
			default:
				return this.status;
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
