const matchPattern = require( './match-pattern' );

describe( 'Test matchPattern function.', () => {

	let results;

	beforeEach( async () => {
		results = await matchPattern( 'content/**/page.*.js' );
	} );

	it( 'Should return an array', () => {
		expect( Array.isArray( results ) ).toBe( true );
	} );

	it( 'Should return a non-empty array', () => {
		expect( results.length ).toBeGreaterThan( 0 );
	} );

} );
