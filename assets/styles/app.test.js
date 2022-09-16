/**
 * This adds our SCSS test cases to our Jest run.
 * Matches any SCSS test cases with the pattern *.test.scss
 */

const path = require( 'path' );
const sassTrue = require( 'sass-true' );
const glob = require( 'glob' );

describe( 'Sass', () => {

	const testFiles = glob.sync( path.resolve( process.cwd(), 'assets/styles/**/*.test.scss' ) );

	// Run tests on all scss files ending with *.spec.scss.
	testFiles.forEach( ( file ) =>
		sassTrue.runSass( { file }, {
			describe,
			it,
		} )
	);
} );
