module.exports = {
	parser: 'babel-eslint',
	env: {
		browser: true,
		jest: true,
		node: true,
	},
	extends: [ '@humanmade/eslint-config' ],
	/*
	ignorePatterns: [
		'dist/*'
	],
	*/
	/*
	parserOptions: {
		sourceType: 'module',
	},
	*/
	rules: {
		'import/order': [
			'error',
			{
				groups: [ [ 'builtin', 'external' ] ],
				'newlines-between': 'never',
			},
		],
		'arrow-parens': [ 'warn', 'always' ],
		/*
		indent: [ 2, 'tab' ],
		'no-tabs': 0,
		'template-curly-spacing': [ 'error', 'always' ],
		'space-in-parens': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'comma-dangle': [
			'error',
			{ functions: 'never' }
		],
		'no-plusplus': 'off',
		'max-len': 'off',
		'import/no-extraneous-dependencies': [
			'error', {
				devDependencies: true,
				optionalDependencies: false,
				peerDependencies: false,
				packageDir: './'
			}
		],
		'no-param-reassign': 0,
		'react/jsx-indent': [ 2, 'tab' ],
		'react/jsx-indent-props': [ 2, 'tab' ],
		'react/jsx-filename-extension': [ 1, { extensions: [ '.js', '.jsx' ] } ]
		*/
	},
};
