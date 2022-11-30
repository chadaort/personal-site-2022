/**
 * Returns RGB values from a hex value.
 *
 * @param {string} hex Hex value
 * @returns {Array} RGB values
 */
export default ( hex ) => {
	return [
		parseInt( hex.slice( 1, 3 ), 16 ),
		parseInt( hex.slice( 3, 5 ), 16 ),
		parseInt( hex.slice( 5, 7 ), 16 ),
	];
};
