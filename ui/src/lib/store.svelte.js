import { wsconnect, Events } from '@nats-io/nats-core';
import { Kvm } from '@nats-io/kv';
import { v4 as uuidv4 } from 'uuid';
import { getWsUrl } from './utils.js';

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
	token = $state();
	user = $state();
	title = $state(DEFAULT_TITLE);
	status = $state(STATUS_DISCONNECTED);
	messages = $state.raw([]);

	isConnected = $derived(this.status == STATUS_CONNECTED);

	#nc;

	async connect() {
		try {
			if (this.#nc) {
				this.status = STATUS_DISCONNECTING;
				await this.#nc.drain();
				this.#nc = null;
			}

			this.status = STATUS_CONNECTING;

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

	async #monitor() {
		(async () => {
			for await (const s of this.#nc.status()) {
				this.status = this.#parseMonitorStatus(s);
			}
		})();

		this.#nc.closed().then((err) => {
			if (err) this.status = err.message;
		});
	}

	async #configure() {
		const kvm = new Kvm(this.#nc);
		const kv = await kvm.create('demo_kv');

		const kvTitle = await kv.get('title');
		this.#setTitle(kvTitle?.string());

		const kvTheme = await kv.get('theme');
		this.#setTheme(kvTheme?.string());

		const watch = await kv.watch();

		(async () => {
			for await (const msg of watch) {
				this.#handleConfigure(msg);
			}
		})().catch((err) => {
			this.status = err.message;
		});
	}

	#listenPing() {
		const sub = this.#nc.subscribe('demo.ping');

		(async () => {
			for await (const msg of sub) {
				this.#handlePing(msg);
			}
		})().catch((err) => {
			this.status = err.message;
		});
	}

	#listenMessages() {
		const sub = this.#nc.subscribe('demo.messages');

		(async () => {
			for await (const msg of sub) {
				this.#handleMessage(msg);
			}
		})().catch((err) => {
			this.status = err.message;
		});
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
		if (this.user) msg.respond(this.user);
	}

	#handleMessage(msg) {
		const message = {
			id: uuidv4(),
			data: this.#parseMessage(msg)
		};

		this.messages = [message, ...this.messages];
	}

	#parseMessage(msg) {
		try {
			return msg.json();
		} catch {}

		return msg.string();
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

export { store };
