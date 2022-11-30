import shuffle from '../../../helpers/shuffle';

/**
 *
 */
export default class Pixels {
	/**
	 * Sets up the class constructor
	 *
	 * @param {Element} container Dom element
	 * @param el
	 * @param canvas
	 * @param image
	 */
	constructor( canvas, image, container ) {
		this.setup( canvas, image, container );
	}

	setup( canvas, image, container ) {

		this.canvas = canvas;
		this.ctx = this.canvas.getContext( '2d' );

		this.imageCanvas = document.createElement( 'canvas' );
		this.imageCtx = this.imageCanvas.getContext( '2d' );

		this.scratchCanvas = document.createElement( 'canvas' );
		this.scratchCtx = this.scratchCanvas.getContext( '2d' );

		this.image = image;
		this.container = container;

		this.scratchCanvas.width = this.imageCanvas.width = container.getBoundingClientRect().width;
		this.scratchCanvas.height = this.imageCanvas.height = container.getBoundingClientRect().width / ( this.image.naturalWidth / this.image.naturalHeight );

		// Resize image.
		this.scratchCtx.drawImage(
			this.image,
			0, 0,
			this.scratchCanvas.width, this.scratchCanvas.height
		);

		// Crop image.
		this.imageCtx.drawImage(
			this.scratchCanvas,
			0, 0,
			this.canvas.width, this.canvas.height,
			0, 0,
			this.canvas.width, this.canvas.height
		);

		this.pixelSize = 15;
		this.time = null;
		this.loop = null;
		this.grid = [];

		this.buildGrid();
		this.drawGrid();
	}

	getAverageRGB( imageData ) {
		let red = 0;
		let green = 0;
		let blue = 0;
		let total = 0;

		for ( let i = 0; i < imageData.length; i += 4 ) {
			if ( imageData[ i + 3 ] !== 0 ) {
				red += imageData[ i + 0 ];
				green += imageData[ i + 1 ];
				blue += imageData[ i + 2 ];
				total++;
			}
		}

		return [
			Math.floor( red / total ),
			Math.floor( green / total ),
			Math.floor( blue / total ),
		];
	}

	buildGrid() {
		for ( let x = 0; x < this.imageCanvas.width; x += this.pixelSize ) {
			for ( let y = 0; y < this.imageCanvas.height; y += this.pixelSize ) {

				const pixels = this.imageCtx.getImageData( x, y, this.pixelSize, this.pixelSize );
				const minDelay = 0;
				const maxDelay = 1;

				this.grid.push( {
					x,
					y,
					rgb: this.getAverageRGB( pixels.data ),
					delay: ( Math.floor( Math.random() * ( maxDelay * 100 - minDelay * 100 ) + minDelay * 100 ) / 100 ) * 1000,
					opacity: 1,
				} );
			}
		}

		this.grid = shuffle( this.grid );
	}

	drawGrid( now = null ) {

		const duration = now ? now - this.startTime : null;

		for ( let i = 0; i < this.grid.length; i++ ) {
			const piece = this.grid[ i ];

			//console.log( now );

			if ( duration ) {

				// DELAY COMPLETE
				// duration / piece.delay >= 1

				//console.log( duration / piece.delay );

				if ( duration / piece.delay >= 1 ) {

					//console.log( duration );

					// duration / ( piece.delay + piece ) = .7

					//piece.opacity = 1 - Math.min( 1, duration / ( piece.delay + 2500 ) );
					piece.opacity = 0;

					//console.log( 'DELAY = ' + piece.delay );
					//console.log( 'DURATION = ' + duration );
					//console.log( duration / ( piece.delay + 500 ) );
					//console.log( 1 - Math.min( 1, duration / ( piece.delay + 500 ) ) );
					//console.log( '-----' );
					//console.log( piece.opacity );

					//if ( piece.opacity === 0 ) {
					piece.animationComplete = true;
					//}

				}

				// piece.delay

			}

			this.ctx.fillStyle = `rgba( ${ piece.rgb[ 0 ] }, ${ piece.rgb[ 1 ] }, ${ piece.rgb[ 2 ] }, ${ piece.opacity } )`;
			this.ctx.fillRect( piece.x, piece.y, this.pixelSize, this.pixelSize );
		}
	}

	startAnimation() {
		this.draw();
	}

	getProgress() {

	}

	draw( now ) {

		if ( now && ! this.startTime ) {
			this.startTime = now;
		}

		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		this.drawGrid( now );

		if ( this.grid.filter( ( piece ) => piece.animationComplete ).length === this.grid.length ) {
			window.cancelAnimationFrame( this.loop );
			return;
		}

		// this.draw.bind( this )
		this.loop = window.requestAnimationFrame( this.draw.bind( this ) );
	}

}
