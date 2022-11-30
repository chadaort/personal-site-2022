/**
 * @jest-environment jsdom
 */
import animate from './canvas-animate';

describe( 'Test sitemap function.', () => {

	let props = {
		opacity: 0,
		color: '#06D6A0',
	};

	beforeEach( () => {
		jest.spyOn( window, 'requestAnimationFrame' ).mockImplementation( ( cb ) => {
			setTimeout( () => {
				cb( window.performance.now() );
			}, 50 );
		} );
	} );

	afterEach( () => {
		window.requestAnimationFrame.mockRestore();
	} );

	it( 'Should have a valid contentFile property', async () => {
		await animate(
			props,
			{ opacity: 1 },
			1000,
			Math.round( ( Math.random() * 2 ) * 100 ) / 100
		);
		expect( props.opacity ).toBeGreaterThanOrEqual( 1 );
	} );

	it( 'Should have a valid contentFile property', async () => {
		await animate(
			props,
			{ color: '#8ecae6' },
			100,
			0
		);
		expect( props.color ).toBe( '#8ecae6' );
	} );
} );
