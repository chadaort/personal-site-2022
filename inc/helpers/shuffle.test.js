const shuffle = require( './shuffle' );

describe( 'Test shuffle function.', () => {

	const testArray = [ ...Array( 10 ).keys() ];

	let results;

	beforeEach( () => {
		results = shuffle( [ ...testArray ] );
	} );

	it( 'Should return an array', () => {
		expect( Array.isArray( results ) ).toBe( true );
	} );

	it( 'Should match the length of the test array', () => {
		expect( results.length ).toBe( testArray.length );
	} );

	it( 'Should not exactly match the original array', () => {
		expect( results ).not.toEqual( testArray );
	} );

} );
