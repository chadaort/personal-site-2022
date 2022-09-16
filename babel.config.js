/**
 * Babel configuration for the project.
 *
 * @param {Babel} api Babel API
 * @returns {object} Babel configuration
 */
module.exports = ( api ) => {
	api.cache.forever();
	return {
		presets: [
			'@babel/preset-env',
			'@babel/preset-react',
		],
		'plugins': [
			[ '@babel/plugin-transform-react-jsx' ],
			[ '@babel/transform-runtime', { regenerator: true } ],
		],
	};
};
