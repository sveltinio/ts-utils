import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	entry: [
		'src/index.ts',
		'src/collections/index.ts',
		'src/dates/index.ts',
		'src/objects/index.ts',
		'src/paths/index.ts',
		'src/urls/index.ts',
		'src/strings/index.ts'
	],
	splitting: false,
	dts: true,
	format: ['cjs', 'esm'],
	sourcemap: false,
	treeshake: true,
	minify: true
});
