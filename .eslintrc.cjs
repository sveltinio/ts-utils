module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname
	},
	plugins: ['@typescript-eslint', 'eslint-plugin-tsdoc'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'tsdoc/syntax': 'warn'
	},
	ignorePatterns: ['*.cjs'],
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
