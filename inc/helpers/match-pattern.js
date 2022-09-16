const glob = require( 'glob' );

/**
 * Matches files using a glob pattern.
 *
 * @param {string} pattern Path match pattern
 * @returns {Promise} An array of filenames found matching the pattern
 */
module.exports = ( pattern ) => {
	return new Promise( ( resolve, reject ) => {
		glob( pattern, ( err, files ) => {
			if ( err ) {
				return reject( err );
			}
			return resolve( files );
		} );
	} );
};
