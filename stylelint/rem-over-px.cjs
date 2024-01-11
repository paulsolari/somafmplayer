// https://github.com/a-tokyo/stylelint-rem-over-px
module.exports = {
	plugins: ['stylelint-rem-over-px'],
	rules: {
		'rem-over-px/rem-over-px': [
			true,
			{
				ignore: ['1px', '$', '--'],
				ignoreFunctions: ['url'],
				ignoreAtRules: ['media'],
				fontSize: 16,
			},
		],
	},
};
