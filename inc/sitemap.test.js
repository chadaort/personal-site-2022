const fs = require( 'fs' );
const sitemap = require( './sitemap' );

describe( 'Test sitemap function.', () => {

	let route;

	beforeEach( async () => {
		const projectSitemap = await sitemap.get();
		route = projectSitemap[0];
	} );

	it( 'Should have a valid contentFile property', async () => {
		await fs.lstat( route.contentFile, ( error, stats ) => {
			expect( typeof stats === 'object' && stats !== null && stats.isFile() ).toBe( true );
		} );
	} );

	it( 'Should have a valid publicPath property', () => {
		expect( route.publicPath.slice( -1 ) ).toBe( '/' );
	} );

	it( 'Should have a valid uri property', () => {
		expect( route.uri.slice( -5 ) ).toBe( '.html' );
	} );

	it( 'Should have a valid modifiedDate property', () => {
		expect( ! isNaN( Date.parse( route.modifiedDate ) ) ).toBe( true );
	} );

	it( 'Should have a valid type property', () => {
		expect( typeof route.type ).toBe( 'string' );
	} );

	it( 'Should have a valid tags property', () => {
		expect( Array.isArray( route.tags ) ).toBe( true );
	} );

} );
