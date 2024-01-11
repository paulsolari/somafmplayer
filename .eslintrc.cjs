module.exports = {
	root: true,
	env: {
		es2024: true,
		browser: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
		extraFileExtensions: ['.vue'],
		parser: {
			js: 'espree',
			cjs: 'espree',
			mjs: 'espree',
			jsx: 'espree',
			ts: '@typescript-eslint/parser',
			cts: '@typescript-eslint/parser',
			mts: '@typescript-eslint/parser',
			tsx: '@typescript-eslint/parser',
		},
	},
	extends: [
		'./eslint/core.cjs',
		'./eslint/import.cjs',
		'./eslint/typescript.cjs',
		'./eslint/sonar.cjs',
		'./eslint/unicorn.cjs',
		'./eslint/vue.cjs',
		'./eslint/prettier.cjs',
	],
};
