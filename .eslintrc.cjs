module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint', 'neverthrow'],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'neverthrow/must-use-result': 'error'
	},
	ignorePatterns: ['*.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: 'module',
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
