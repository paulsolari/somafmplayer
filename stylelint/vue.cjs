// https://github.com/ota-meshi/stylelint-config-html
module.exports = {
	overrides: [
		{
			files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
			customSyntax: 'postcss-html',
			rules: {},
		},
	],
};
