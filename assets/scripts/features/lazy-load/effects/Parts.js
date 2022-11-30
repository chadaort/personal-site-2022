import animate from '../../../helpers/canvas-animate';
import shuffle from '../../../helpers/shuffle';

/**
 * Builds a canvas that displays a grid of projects with a blended overlay.
 */
export default class Pieces {
	/**
	 * Sets up the class constructor
	 *
	 * @param {Element} container Dom element
	 * @param canvas
	 * @param el
	 * @param image
	 * @param redraw
	 */
	constructor( canvas, image, el ) {
		this.scratchCanvas = document.createElement( 'canvas' );
		this.imageCanvas = document.createElement( 'canvas' );
		this.setup( canvas, image, el );
	}

	/**
	 * Sets up the canvas.
	 *
	 * @param {Element} container Dom element
	 * @param canvas
	 * @param el
	 * @param image
	 * @param redraw
	 * @returns {undefined} Void
	 */
	setup( canvas, image, el, redraw = false ) {
		this.el = el;
		this.image = image;

		this.canvas = canvas;
		this.ctx = this.canvas.getContext( '2d' );
		this.scratchCtx = this.scratchCanvas.getContext( '2d' );
		this.imageCtx = this.imageCanvas.getContext( '2d' );

		//this.ctx.imageSmoothingEnabled = this.imageCtx.imageSmoothingEnabled = this.scratchCtx.imageSmoothingEnabled = false;
		this.ctx.imageSmoothingQuality = this.imageCtx.imageSmoothingQuality = this.scratchCtx.imageSmoothingQuality = 'high';

		this.canvas.width = this.imageCanvas.width = this.el.getBoundingClientRect().width;
		this.canvas.height = this.imageCanvas.height = this.el.getBoundingClientRect().height;

		this.scratchCanvas.width = this.canvas.width;
		this.scratchCanvas.height = this.canvas.width / ( this.image.naturalWidth / this.image.naturalHeight );

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

		this.parts = [];
		this.loop = null;

		if ( ! redraw ) {
			this.changeHandler();
		}

		this.buildParts();
		this.drawInitialView();
	}

	buildParts() {

		const pieceWideWidth = 30;
		const pieceWideHeight = 40;
		const pieceTallWidth = 25;
		const pieceTallHeight = 100;
		const gutterXSize = ( 100 - ( ( pieceWideWidth * 2 ) + pieceTallWidth ) ) / 4;
		const gutterWideYSize = ( 100 - ( pieceWideHeight * 2 ) ) / 3;
		const gutterTallYSize = ( 100 - ( pieceTallHeight ) ) / 2;

		this.parts.push( {
			x: gutterXSize,
			y: gutterWideYSize,
			width: pieceWideWidth,
			height: pieceWideHeight,
			color: '#06D6A0',
			animationDelay: Math.round( ( Math.random() * 500 ) * 100 ) / 100,
		} );

		this.parts.push( {
			x: gutterXSize,
			y: ( gutterWideYSize * 2 ) + pieceWideHeight,
			width: pieceWideWidth,
			height: pieceWideHeight,
			color: '#8ecae6',
			animationDelay: Math.round( ( Math.random() * 500 ) * 100 ) / 100,
		} );

		this.parts.push( {
			x: ( gutterXSize * 2 ) + pieceWideWidth,
			y: gutterTallYSize,
			width: pieceTallWidth,
			height: pieceTallHeight,
			color: '#ffd166',
			animationDelay: Math.round( ( Math.random() * 500 ) * 100 ) / 100,
		} );

		this.parts.push( {
			x: ( gutterXSize * 3 ) + pieceWideWidth + pieceTallWidth,
			y: gutterWideYSize,
			width: pieceWideWidth,
			height: pieceWideHeight,
			color: '#80ed99',
			animationDelay: Math.round( ( Math.random() * 500 ) * 100 ) / 100,
		} );

		this.parts.push( {
			x: ( gutterXSize * 3 ) + pieceWideWidth + pieceTallWidth,
			y: ( gutterWideYSize * 2 ) + pieceWideHeight,
			width: pieceWideWidth,
			height: pieceWideHeight,
			color: '#00bbf9',
			animationDelay: Math.round( ( Math.random() * 500 ) * 100 ) / 100,
		} );
	}

	/**
	 * Animates an image piece.
	 *
	 * @param {object} props Piece properties
	 * @returns {undefined} Void
	 */
	async animate( props ) {

	}

	roundRect( ctx, x, y, width, height, radius = 5, fill = false ) {

		ctx.beginPath();
		ctx.moveTo( x + radius, y );
		ctx.lineTo( x + width - radius, y );
		ctx.quadraticCurveTo( x + width, y, x + width, y + radius );
		ctx.lineTo( x + width, y + height - radius );
		ctx.quadraticCurveTo( x + width, y + height, x + width - radius, y + height );
		ctx.lineTo( x + radius, y + height );
		ctx.quadraticCurveTo( x, y + height, x, y + height - radius );
		ctx.lineTo( x, y + radius );
		ctx.quadraticCurveTo( x, y, x + radius, y );
		ctx.closePath();

		if ( fill ) {
			ctx.fill();
		}
	}

	drawInitialView() {

		for ( let i = 0; i < this.parts.length; i++ ) {

			const part = this.parts[ i ];
			const x = this.canvas.width * ( part.x / 100 );
			const y = this.canvas.height * ( part.y / 100 );
			const width = this.canvas.width * ( part.width / 100 );
			const height = this.canvas.height * ( part.height / 100 );

			this.scratchCanvas.width = width;
			this.scratchCanvas.height = height;
			this.scratchCtx.clearRect( 0, 0, width, height );

			this.scratchCtx.save();
			this.scratchCtx.fillStyle = 'blue';
			this.roundRect( this.scratchCtx, 0, 0, width, height, 25, true );
			this.scratchCtx.drawImage(
				this.imageCanvas,
				x, y,
				width, height,
				0, 0,
				width, height
			);
			this.scratchCtx.clip();

			// draw the image
			this.scratchCtx.restore(); // so clipping path won't affect anything else drawn afterwards

			// this.scratchCtx.fillStyle = 'red';

			this.ctx.drawImage(
				this.scratchCanvas,
				x, y
			);

			//this.ctx.fillStyle = 'red';
			//this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );
		}
	}

	startAnimation() {
		//this.loop = window.requestAnimationFrame( () => this.draw() );
	}

	draw() {

		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		this.loop = window.requestAnimationFrame( () => this.draw() );
	}

	/**
	 * Handles when the canvas changes and needs reset.
	 *
	 * @returns {undefined} Void
	 */
	changeHandler() {

		/**
		 * Change event for the main canvas element.
		 *
		 * @returns {undefined} Void
		 */
		const onChange = () => {

			window.cancelAnimationFrame( this.loop );

			// Set the canvas width to zero so that we can determine the block level width of the parent.
			this.canvas.width = 0;
			this.setup( this.canvas, this.image, this.el, true );
		};

		window.addEventListener( 'resize', onChange );
		document.body.addEventListener( 'themeChangeEvent', onChange );
	}
}
