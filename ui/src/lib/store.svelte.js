import { wsconnect, Events } from '@nats-io/nats-core';
import { Kvm } from '@nats-io/kv';
import { v4 as uuidv4 } from 'uuid';

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
				servers: 'ws://localhost:8080/ws',
				name: 'ui',
				user: 'ui',
				pass: this.token,
				timeout: 120_000,
				maxReconnectAttempts: -1,
				waitOnFirstConnect: true
			});

			this.#monitor();
			this.#configure();
			this.#listen_ping();
			this.#listen_messages();

			this.status = STATUS_CONNECTED;
		} catch (err) {
			this.status = err.message;
		}
	}

	async #monitor() {
		(async () => {
			for await (const s of this.#nc.status()) {
				this.status = this.#parse_monitor_status(s);
			}
		})();

		this.#nc.closed().then((err) => {
			if (err) this.status = err.message;
		});
	}

	async #configure() {
		const kvm = new Kvm(this.#nc);
		const kv = await kvm.create('demo_kv');

		const kv_title = await kv.get('title');
		this.#set_title(kv_title?.string());

		const kv_theme = await kv.get('theme');
		this.#set_theme(kv_theme?.string());

		const watch = await kv.watch();

		(async () => {
			for await (const msg of watch) {
				this.#handle_configure(msg);
			}
		})().catch((err) => {
			this.status = err.message;
		});
	}

	#listen_ping() {
		const sub = this.#nc.subscribe('demo.ping');

		(async () => {
			for await (const msg of sub) {
				this.#handle_ping(msg);
			}
		})().catch((err) => {
			this.status = err.message;
		});
	}

	#listen_messages() {
		const sub = this.#nc.subscribe('demo.messages');

		(async () => {
			for await (const msg of sub) {
				this.#handle_message(msg);
			}
		})().catch((err) => {
			this.status = err.message;
		});
	}

	#handle_configure(msg) {
		switch (msg.key) {
			case 'title':
				this.#set_title(msg.string());
				break;
			case 'theme':
				this.#set_theme(msg.string());
				break;
		}
	}

	#handle_ping(msg) {
		if (this.user) msg.respond(this.user);
	}

	#handle_message(msg) {
		const message = {
			id: uuidv4(),
			data: this.#parse_message(msg)
		};

		this.messages = [message, ...this.messages];
	}

	#parse_message(msg) {
		try {
			return msg.json();
		} catch {}

		return msg.string();
	}

	#parse_monitor_status(s) {
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

	#set_title(title) {
		this.title = title || DEFAULT_TITLE;
	}

	#set_theme(theme) {
		if (!theme || !THEMES.includes(theme)) theme = DEFAULT_THEME;
		document.documentElement.setAttribute('data-bs-theme', theme);
	}
}

const store = new AppStore();

export { store };
