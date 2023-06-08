import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	entry: [
		'src/a11y/index.ts',
		'src/collections/index.ts',
		'src/colors/index.ts',
		'src/css/index.ts',
		'src/dates/index.ts',
		'src/is/index.ts',
		'src/objects/index.ts',
		'src/paths/index.ts',
		'src/urls/index.ts',
		'src/strings/index.ts',
		'src/index.ts'
	],
	splitting: false,
	dts: true,
	format: ['cjs', 'esm'],
	sourcemap: false,
	treeshake: true,
	minify: true
});
