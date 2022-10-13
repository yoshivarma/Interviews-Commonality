import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Unocss from 'unocss/vite';
import { resolve } from 'path';

const config: UserConfig = {
	plugins: [
		sveltekit(),
		Unocss({
			/* options */
		})
	],
	resolve: {
		alias: {
			$components: resolve('src/lib/components'),
			$services: resolve('./src/lib/services'),
			$models: resolve('./src/lib/models')
		}
	}
};

export default config;
