import hexToRgb from './hex-to-rgb';
import rgbToHex from './rgb-to-hex';

/**
 * @param a
 * @param b
 * @param u
 */
const lerp = ( a, b, u ) => ( 1 - u ) * a + u * b;

/**
 * Using the starting and end color along with the percentage it returns the linear color between the start and end color.
 *
 * @param {Array} start RGB color
 * @param {Array} end RGB color
 * @param {number} percentage Represent how far along the animation is
 * @returns {Array} RGB color
 */
const colorMove = ( start, end, percentage ) => {

	return [
		parseInt( lerp( start[0], end[0], percentage ) ),
		parseInt( lerp( start[1], end[1], percentage ) ),
		parseInt( lerp( start[2], end[2], percentage ) ),
	];
};

/**
 * Animates between two points.
 *
 * @param {object} obj The object containing the properties being animated
 * @param {object} props Properties from obj to animate
 * @param {number} duration animation duration
 * @param {number} delay amount of time to delay the animation
 * @returns {Promise} Resolves when the animation is complete
 */
const animate = ( obj, props, duration = 0, delay = 0 ) => {

	return new Promise( ( resolve ) => {

		const animations = [];
		for ( const prop in props ) {
			animations.push( {
				from: obj[ prop ],
				to: props[ prop ],
				prop,
				obj,
				complete: false,
			} );
		}

		let startTime = null;

		/**
		 * Animation loop.
		 *
		 * @param {number} now Milliseconds since the animation started
		 * @returns {undefined} Void
		 */
		const loop = ( now ) => {

			if ( ! startTime ) {
				startTime = now;
			}

			if ( delay >= now - startTime ) {
				window.requestAnimationFrame( loop );
				return;
			}

			for ( let i = 0; i < animations.length; i++ ) {

				const animation = animations[ i ];
				const currentPercent = Math.min( 1, ( now - ( startTime + delay ) ) / duration );

				// Is number.
				if ( isNaN( obj[ animation.prop ] ) === false ) {

					obj[ animation.prop ] = ( ( animation.to - animation.from ) / 100 ) * Math.round( currentPercent * 100 ) + animation.from;

					if ( currentPercent >= 1 ) {
						animation.complete = true;
					}

					continue;
				}

				// Is either a hex or rgb color.
				if ( typeof obj[ animation.prop ] === 'string' ) {

					let colorType = null;
					let fromValues = null;
					let toValues = null;

					if ( obj[ animation.prop ].startsWith( '#' ) ) {
						colorType = 'hex';
						fromValues = hexToRgb( animation.from );
						toValues = hexToRgb( animation.to );
					} else if ( obj[ animation.prop ].includes( 'rgb' ) ) {
						colorType = 'rgb';
						fromValues = obj[ animation.from ].match( /\d+/g );
						toValues = obj[ animation.to ].match( /\d+/g );
					}

					if ( fromValues && toValues ) {
						const currentColor = colorMove( fromValues, toValues, currentPercent );

						if ( colorType === 'hex' ) {
							obj[ animation.prop ] = rgbToHex( currentColor[0], currentColor[1], currentColor[2] );
						} else {
							obj[ animation.prop ] = `rgb( ${ currentColor[0] }, ${ currentColor[1] }, ${ currentColor[2] } )`;
						}
					}

					if ( currentPercent >= 1 ) {
						animation.complete = true;
					}
				}
			}

			if ( animations.filter( ( animation ) => animation.complete ).length === animations.length ) {
				window.cancelAnimationFrame( loop );
				return resolve();
			}

			window.requestAnimationFrame( loop );
		};

		window.requestAnimationFrame( loop );
	} );
};

export default animate;
