/**
 * Returns a shuffled array.
 *
 * @param {Array} list Array to be shuffled
 * @returns {Array} A shuffled array
 */
export default ( list ) => {
	let currentIndex = list.length;
	let randomIndex;

	// While there remain elements to shuffle.
	while ( currentIndex !== 0 ) {
		// Pick a remaining element.
		randomIndex = Math.floor( Math.random() * currentIndex );
		currentIndex--;

		// And swap it with the current element.
		[ list[currentIndex], list[randomIndex] ] = [ list[randomIndex], list[currentIndex] ];
	}

	return list;
};
