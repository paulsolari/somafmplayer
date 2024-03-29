// https://github.com/sindresorhus/eslint-plugin-unicorn
module.exports = {
	plugins: ['unicorn'],
	rules: {
		'unicorn/better-regex': 'error',
		'unicorn/catch-error-name': 'error',
		'unicorn/consistent-destructuring': 'error',
		'unicorn/consistent-function-scoping': 'error',
		'unicorn/custom-error-definition': 'off',
		'unicorn/empty-brace-spaces': 'off',
		'unicorn/error-message': 'error',
		'unicorn/escape-case': 'error',
		'unicorn/expiring-todo-comments': 'off',
		'unicorn/explicit-length-check': 'error',
		'unicorn/filename-case': ['error', { case: 'kebabCase' }],
		'unicorn/import-style': 'error',
		'unicorn/new-for-builtins': 'error',
		'unicorn/no-abusive-eslint-disable': 'off',
		'unicorn/no-array-callback-reference': 'error',
		'unicorn/no-array-for-each': 'off',
		'unicorn/no-array-method-this-argument': 'error',
		'unicorn/no-array-push-push': 'error',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-await-expression-member': 'error',
		'unicorn/no-console-spaces': 'off',
		'unicorn/no-document-cookie': 'error',
		'unicorn/no-empty-file': 'error',
		'unicorn/no-for-loop': 'error',
		'unicorn/no-hex-escape': 'error',
		'unicorn/no-instanceof-array': 'error',
		'unicorn/no-invalid-remove-event-listener': 'error',
		'unicorn/no-keyword-prefix': 'off',
		'unicorn/no-lonely-if': 'error',
		'unicorn/no-negated-condition': 'error',
		'unicorn/no-nested-ternary': 'error',
		'unicorn/no-new-array': 'error',
		'unicorn/no-new-buffer': 'error',
		'unicorn/no-null': 'off',
		'unicorn/no-object-as-default-parameter': 'error',
		'unicorn/no-process-exit': 'off',
		'unicorn/no-static-only-class': 'error',
		'unicorn/no-thenable': 'error',
		'unicorn/no-this-assignment': 'error',
		'unicorn/no-typeof-undefined': 'error',
		'unicorn/no-unnecessary-await': 'error',
		'unicorn/no-unnecessary-polyfills': 'off',
		'unicorn/no-unreadable-array-destructuring': 'error',
		'unicorn/no-unreadable-iife': 'error',
		'unicorn/no-unused-properties': 'off',
		'unicorn/no-useless-fallback-in-spread': 'error',
		'unicorn/no-useless-length-check': 'error',
		'unicorn/no-useless-promise-resolve-reject': 'error',
		'unicorn/no-useless-spread': 'error',
		'unicorn/no-useless-switch-case': 'error',
		'unicorn/no-useless-undefined': 'error',
		'unicorn/no-zero-fractions': 'error',
		'unicorn/number-literal-case': 'error',
		'unicorn/numeric-separators-style': ['error', { number: { minimumDigits: 6 } }],
		'unicorn/prefer-add-event-listener': 'error',
		'unicorn/prefer-array-find': 'error',
		'unicorn/prefer-array-flat-map': 'error',
		'unicorn/prefer-array-flat': 'error',
		'unicorn/prefer-array-index-of': 'error',
		'unicorn/prefer-array-some': 'error',
		'unicorn/prefer-at': 'error',
		'unicorn/prefer-blob-reading-methods': 'error',
		'unicorn/prefer-code-point': 'error',
		'unicorn/prefer-date-now': 'off',
		'unicorn/prefer-default-parameters': 'off',
		'unicorn/prefer-dom-node-append': 'error',
		'unicorn/prefer-dom-node-dataset': 'error',
		'unicorn/prefer-dom-node-remove': 'error',
		'unicorn/prefer-dom-node-text-content': 'error',
		'unicorn/prefer-event-target': 'error',
		'unicorn/prefer-export-from': 'off',
		'unicorn/prefer-includes': 'error',
		'unicorn/prefer-json-parse-buffer': 'off',
		'unicorn/prefer-keyboard-event-key': 'error',
		'unicorn/prefer-logical-operator-over-ternary': 'error',
		'unicorn/prefer-math-trunc': 'error',
		'unicorn/prefer-modern-dom-apis': 'error',
		'unicorn/prefer-modern-math-apis': 'error',
		'unicorn/prefer-module': 'error',
		'unicorn/prefer-native-coercion-functions': 'error',
		'unicorn/prefer-negative-index': 'error',
		'unicorn/prefer-node-protocol': 'error',
		'unicorn/prefer-number-properties': 'error',
		'unicorn/prefer-object-from-entries': 'error',
		'unicorn/prefer-optional-catch-binding': 'error',
		'unicorn/prefer-prototype-methods': 'error',
		'unicorn/prefer-query-selector': 'error',
		'unicorn/prefer-reflect-apply': 'error',
		'unicorn/prefer-regexp-test': 'error',
		'unicorn/prefer-set-has': 'error',
		'unicorn/prefer-set-size': 'error',
		'unicorn/prefer-spread': 'error',
		'unicorn/prefer-string-replace-all': 'error',
		'unicorn/prefer-string-slice': 'error',
		'unicorn/prefer-string-starts-ends-with': 'error',
		'unicorn/prefer-string-trim-start-end': 'error',
		'unicorn/prefer-switch': 'off',
		'unicorn/prefer-ternary': 'off',
		'unicorn/prefer-top-level-await': 'off',
		'unicorn/prefer-type-error': 'error',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/relative-url-style': ['error', 'always'],
		'unicorn/require-array-join-separator': 'error',
		'unicorn/require-number-to-fixed-digits-argument': 'error',
		'unicorn/require-post-message-target-origin': 'off',
		'unicorn/string-content': 'off',
		'unicorn/switch-case-braces': 'error',
		'unicorn/template-indent': 'warn',
		'unicorn/text-encoding-identifier-case': 'off',
		'unicorn/throw-new-error': 'error',
	},
	overrides: [
		{
			files: ['*.vue'],
			rules: { 'unicorn/filename-case': ['error', { case: 'pascalCase' }] },
		},
	],
};
