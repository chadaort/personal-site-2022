/**
 * Based on on the Fisher-Yates shuffle.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm.
 *
 * @param {Array} list An array of items to be shuffled
 * @returns {Array} A shuffled array
 */
module.exports = ( list ) => {
	const ref = list;
	for ( let i = ref.length; i; i-- ) {
		let j = Math.floor( Math.random() * i );
		[ ref[ i - 1 ], ref[ j ] ] = [ ref[ j ], ref[ i - 1 ] ];
	}
	return ref;
};
