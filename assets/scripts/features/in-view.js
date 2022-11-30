/**
 * @param el
 * @param cb
 */
export default ( el ) => {
	return new Promise( ( resolve ) => {
		const elementObserver = new IntersectionObserver( ( entries, observer ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					elementObserver.unobserve( entry.target );
					return resolve();
				}
			} );
		}, {
			threshold: 1.0,
		} );
		elementObserver.observe( el );
	} );
};
