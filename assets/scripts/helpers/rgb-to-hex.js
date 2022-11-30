/**
 * Returns RGB values from a hex value.
 *
 * @param {string} hex Hex value
 * @param r
 * @param g
 * @param b
 * @returns {Array} RGB values
 */
export default ( r, g, b ) => '#' + [ r, g, b ].map( ( x ) => {
	const hex = x.toString( 16 );
	return hex.length === 1 ? '0' + hex : hex;
} ).join( '' );
