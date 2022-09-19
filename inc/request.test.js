const requestHandler = require( './request' );

describe( 'Test redirects and rewrites', () => {

	it( 'Should work when it ends with index.html', () => {
		const pageRequest = requestHandler( {
			uri: 'foo/index.html',
		} );
		expect( pageRequest.headers.location[0].value ).toEqual( 'foo/' );
	} );

	it( 'Should work with *.html', () => {
		const pageRequest = requestHandler( {
			uri: 'foo/bar.html',
		} );
		expect( pageRequest.headers.location[0].value ).toEqual( 'foo/bar' );
	} );

	it( 'Should work when it ends with a slash', () => {
		const pageRequest = requestHandler( {
			uri: 'foo/bar/',
		} );
		expect( pageRequest.uri ).toEqual( 'foo/bar/index.html' );
	} );

	it( 'Should work when the URL includes a file extension', () => {
		const pageRequest = requestHandler( {
			uri: 'foo/bar.jpg',
		} );
		expect( pageRequest.uri ).toEqual( 'foo/bar.jpg' );
	} );

	it( 'Should work with just a basename', () => {
		const pageRequest = requestHandler( {
			uri: 'foo/bar',
		} );
		expect( pageRequest.uri ).toEqual( 'foo/bar.html' );
	} );
} );
