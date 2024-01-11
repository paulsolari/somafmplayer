module.exports = {
	defaultSeverity: 'warning',
	extends: [
		'./stylelint/core.cjs',
		'./stylelint/scss.cjs',
		'./stylelint/vue.cjs',
		'./stylelint/order.cjs',
		'./stylelint/rem-over-px.cjs',
		'./stylelint/prettier.cjs',
	],
};
