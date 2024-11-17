import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		strictPort: true,
		proxy: {
			'/ws': {
				target: 'ws://localhost:8080'
			}
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				quietDeps: true,
				silenceDeprecations: ['import', 'legacy-js-api']
			}
		}
	}
});
