import gsap from 'gsap';
import inView from './in-view';
import delay from '../helpers/delay';
import shuffle from '../helpers/shuffle';

const COLORS = [
	'#06D6A0',
	'#8ecae6',
	'#ffd166',
	'#80ed99',
	'#00bbf9',
	'#e76f51',
	'#f77f00',
	'#ef476f',
];

/**
 * Builds a canvas that displays a grid of projects with a blended overlay.
 */
class ImagePieces {
	/**
	 * Sets up the class constructor
	 *
	 * @param {Element} container Dom element
	 * @param el
	 * @param image
	 */
	constructor( el, image ) {
		this.setup( el, image );
	}

	/**
	 * Sets up the canvas.
	 *
	 * @param {Element} container Dom element
	 * @param el
	 * @param image
	 * @returns {undefined} Void
	 */
	setup( el, image ) {
		this.el = el;
		this.image = image;

		this.canvas = document.createElement( 'canvas' );
		this.ctx = this.canvas.getContext( '2d' );

		this.scratchCanvas = document.createElement( 'canvas' );
		this.scratchCtx = this.scratchCanvas.getContext( '2d' );

		this.imageCanvas = document.createElement( 'canvas' );
		this.imageCtx = this.imageCanvas.getContext( '2d' );

		this.ctx.imageSmoothingEnabled = this.imageCtx.imageSmoothingEnabled = this.scratchCtx.imageSmoothingEnabled = false;
		// this.ctx.imageSmoothingQuality = this.imageCtx.imageSmoothingQuality = this.scratchCtx.imageSmoothingQuality = 'high';

		// this.ctx.imageSmoothingQuality = this.scratchCtx.imageSmoothingQuality = 'high';
		// this.imageCtx.imageSmoothingQuality = 'high';

		this.canvas.width = this.imageCanvas.width = this.el.parentNode.getBoundingClientRect().width;
		this.canvas.height = this.imageCanvas.height = this.el.parentNode.getBoundingClientRect().height;

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

		this.el.parentNode.insertBefore( this.canvas, this.el );

		this.el.aspectRatio = this.el.width / this.el.height;
		this.el.style.display = 'none';

		this.imageGridPieces = [];
		this.gridGap = 2;
		this.gridItemPercentage = window.innerWidth > 600 && window.innerWidth < 880 ? 20 : 25;

		// The amount of grid items that can be stacked vertically based on the preferred piece percentage size.
		this.gridItemSize = ( this.canvas.height - ( this.gridGap * ( 100 / this.gridItemPercentage ) ) ) / ( 100 / this.gridItemPercentage );

		this.shapeSizes = {
			square: [ this.gridItemSize, this.gridItemSize ],
			wide: [ this.gridItemSize * 2 + this.gridGap, this.gridItemSize ],
			tall: [ this.gridItemSize, this.gridItemSize * 2 + this.gridGap ],
			squareLarge: [ this.gridItemSize * 2 + this.gridGap, this.gridItemSize * 2 + this.gridGap ],
		};

		this.filledCells = [];

		this.rows = Math.floor( this.canvas.height / ( this.gridItemSize + this.gridGap ) );

		if ( window.innerWidth < 880 ) {
			this.cols = Math.ceil( this.canvas.width / ( this.gridItemSize + this.gridGap ) );
		} else {
			this.cols = Math.floor( this.canvas.width / ( this.gridItemSize + this.gridGap ) );
		}

		this.currentRowCount = this.rows;
		this.currentColCount = this.cols;
		this.lastInRow = false;
		this.skip = false;

		this.debug = false;

		this.loop = null;

		this.defineGridPieces();
		this.drawInitialView();
		this.changeHandler();
	}

	/**
	 * Get a list of available shapes for a cell position.
	 *
	 * @param cellNumber Current cell number from iterating over grid.
	 * @param lastCol
	 * @param lastRow
	 * @returns {Array} List of available shapes.
	 */
	getShapes( cellNumber, lastCol, lastRow ) {

		/**
		 * Returns cell numbers by shape.
		 *
		 * @param shape Name of the shape.
		 * @param cellNumber Current cell number from iterating over grid.
		 * @returns {Array} Cell positions that this shape will use.
		 */
		const getCells = ( shape, cellNumber ) => {

			switch ( shape ) {
				case 'square':
					return [ cellNumber ];

				case 'wide':
					return [
						cellNumber,
						cellNumber + 1,
					];

				case 'tall':
					return [
						cellNumber,
						cellNumber + this.cols,
					];

				case 'squareLarge':
					return [
						cellNumber,
						cellNumber + 1,
						cellNumber + this.cols,
						cellNumber + this.cols + 1,
					];

				default:
					console.log( 'Didn\'t match a cell size = ' + shape );
			}
		};

		if ( this.filledCells.includes( cellNumber ) ) {
			return [];
		}

		const lastInRow = cellNumber % this.currentColCount === 0;
		const lastInCol = cellNumber % this.currentRowCount === 0;
		let shapes = { ...this.shapeSizes };

		if ( lastInRow || this.filledCells.includes( cellNumber + 1 ) ) {
			delete shapes.wide;
			delete shapes.squareLarge;
		}

		if ( lastInRow || this.filledCells.includes( cellNumber + this.cols ) ) {
			delete shapes.tall;
			delete shapes.squareLarge;
		}

		if ( lastCol ) {
			delete shapes.squareLarge;
			delete shapes.wide;
		}

		if ( lastRow ) {
			delete shapes.squareLarge;
			delete shapes.tall;
		}

		for ( const shape in shapes ) {

			shapes[ shape ] = {
				name: shape,
				sizes: shapes[ shape ],
				cells: getCells( shape, cellNumber ),
			};

		}

		return shapes;
	}

	/**
	 * Determines the pieces in the grid and sets the cords/details in filledCells.
	 *
	 * @param {string} direction Build towards the left or right
	 * @returns {undefined} Void
	 */
	defineGridPieces( direction = 'right' ) {

		let cellNumber = 0;
		let gridX = direction === 'right' ? 0 : this.canvas.width;
		let pieceX = direction === 'right' ? 0 : this.canvas.width;
		let gridY = this.canvas.height;
		let pieceY = this.canvas.height;
		let counter = 0;

		for ( let i = 0; i < this.rows; i++ ) {

			let rowComplete = false;
			//let lastRow = false;

			for ( let j = 0; j < this.cols; j++ ) {

				cellNumber++;

				if ( this.skip ) {
					// continue;
				}

				if ( cellNumber % this.currentColCount === 0 ) {
					this.lastInRow = true;
					this.skip = true;
				}

				if ( rowComplete ) {
					break;
				}

				const shapes = this.getShapes(
					cellNumber,
					( this.cols - 1 ) === j,
					( this.rows - 1 ) === i
				);
				const shapesKeys = Object.keys( shapes );

				const shape = shapesKeys.length ? shapes[ shapesKeys[ Math.floor( Math.random() * shapesKeys.length ) ] ] : false;

				if ( shape ) {

					if ( this.debug === true || ( this.debug && this.debug.showGrid ) ) {
						this.ctx.fillStyle = 'red';
						this.ctx.fillRect( gridX, gridY - shape.sizes[1], shape.sizes[0], shape.sizes[1] );
					}

					if ( this.debug === true || ( this.debug && this.debug.showGridText ) ) {
						this.ctx.fillStyle = 'black';
						this.ctx.font = 'bold 16px Arial';

						let shortName;

						switch ( shape.name ) {
							case 'squareLarge':
								shortName = 'SQL';
								break;

							case 'tall':
								shortName = 'T';
								break;

							case 'wide':
								shortName = 'W';
								break;

							default:
								shortName = 'SQ';
						}

						this.ctx.fillText( shortName, gridX + 5, gridY - ( this.gridItemSize - 16 ) + 25 );
					}

					if ( ! this.imageGridPieces[ i ] ) {
						this.imageGridPieces[ i ] = [];
					}

					if ( counter >= COLORS.length - 1 ) {
						counter = 0;
					}

					const shuffledColors = shuffle( [ ...COLORS ] );

					this.imageGridPieces[ i ].push( {
						name: shape.name,
						x: direction === 'right' ? pieceX : pieceX - shape.sizes[0],
						y: pieceY - shape.sizes[1],
						width: shape.sizes[0],
						height: shape.sizes[1],
						color: shuffledColors[0],
						colors: [
							shuffledColors[1],
							shuffledColors[2],
							shuffledColors[3],
							shuffledColors[4],
							shuffledColors[5],
						],
						timelineComplete: false,
						imageOpacity: 0,
						hasDrawnImage: false,
						imageComplete: false,
					} );

					counter++;

					this.filledCells.push( ...shape.cells );
				}

				if ( this.debug === true || ( this.debug && this.debug.showGridText ) ) {
					this.ctx.fillStyle = 'blue';
					this.ctx.font = 'bold 16px Arial';
					this.ctx.fillText( cellNumber, gridX + 5, gridY - ( this.gridItemSize - 16 ) + 5 );
				}

				gridX = direction === 'right' ? gridX + this.gridItemSize : gridX - this.gridItemSize;
				pieceX = direction === 'right' ? pieceX + this.gridItemSize + this.gridGap : pieceX - ( this.gridItemSize + this.gridGap );
			}
			this.lastCol =
			this.lastInRow = false;
			this.skip = false;
			this.currentColCount = this.currentColCount - 1;
			gridX = pieceX = direction === 'right' ? 0 : this.canvas.width;
			gridY -= this.gridItemSize;
			pieceY -= this.gridItemSize + this.gridGap;
		}

		this.currentRowCount = this.currentRowCount - 1;
		this.imageGridPieces = this.imageGridPieces.filter( ( item ) => item );
	}

	/**
	 * Animates an image piece.
	 *
	 * @param {object} props Piece properties
	 * @returns {undefined} Void
	 */
	animate( props ) {
		gsap.timeline()

			.to( props, {
				color: props.colors[0],
				duration: .1,
				delay: Math.round( ( Math.random() * 2 ) * 100 ) / 100,
			}, '+=.15' )

			.to( props, {
				color: props.colors[1],
				duration: .1,
			}, '+=.15' )

			// End loop.
			.then( () => {

				gsap.to( props, {
					imageOpacity: 1,
					duration: .5,
					onComplete: () => {
						props.imageShown = true;
					},
				} );

				props.colorAnimationComplete = true;
			} );
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

		for ( let i = 0; i < this.imageGridPieces.length; i++ ) {

			if ( ! this.imageGridPieces[ i ] || ! this.imageGridPieces[ i ].length ) {
				continue;
			}

			for ( let j = 0; j < this.imageGridPieces[ i ].length; j++ ) {
				const piece = this.imageGridPieces[ i ][ j ];

				const x = piece.x;
				const y = piece.y;

				this.ctx.fillStyle = `${ piece.color }`;
				this.roundRect( this.ctx, x, y, piece.width, piece.height, 5, true );

				this.scratchCanvas.width = piece.width;
				this.scratchCanvas.height = piece.height;
				this.scratchCtx.clearRect( 0, 0, piece.x, piece.y );
				this.scratchCtx.globalCompositeOperation = 'source-over';

				this.scratchCtx.drawImage(
					this.imageCanvas,
					x, y,
					piece.width, piece.height,
					0, 0,
					piece.width, piece.height
				);

				this.scratchCtx.globalCompositeOperation = 'destination-in';

				this.roundRect( this.scratchCtx, 0, 0, piece.width, piece.height, 5, true );

				this.ctx.globalAlpha = piece.imageOpacity;
				this.ctx.drawImage( this.scratchCanvas, x, y );
				this.ctx.globalAlpha = 1;
			}
		}
	}

	startAnimation() {

		for ( let i = 0; i < this.imageGridPieces.length; i++ ) {
			for ( let j = 0; j < this.imageGridPieces[ i ].length; j++ ) {
				this.animate( this.imageGridPieces[ i ][ j ] );
			}
		}

		this.loop = window.requestAnimationFrame( () => this.draw() );
	}

	draw() {

		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		for ( let i = 0; i < this.imageGridPieces.length; i++ ) {
			for ( let j = 0; j < this.imageGridPieces[ i ].length; j++ ) {

				const piece = this.imageGridPieces[ i ][ j ];

				const x = piece.x;
				const y = piece.y;

				if ( ! piece.colorAnimationComplete ) {
					this.ctx.fillStyle = `${ piece.color }`;
					this.roundRect( this.ctx, x, y, piece.width, piece.height, 5, true );
				} else {

					this.scratchCanvas.width = piece.width;
					this.scratchCanvas.height = piece.height;
					this.scratchCtx.clearRect( 0, 0, piece.x, piece.y );

					this.scratchCtx.globalCompositeOperation = 'source-over';
					this.scratchCtx.drawImage(
						this.imageCanvas,
						x, y,
						piece.width, piece.height,
						0, 0,
						piece.width, piece.height
					);
					this.scratchCtx.globalCompositeOperation = 'destination-in';

					this.roundRect( this.scratchCtx, 0, 0, piece.width, piece.height, 5, true );

					this.ctx.globalAlpha = this.imageGridPieces[ i ][ j ].imageOpacity;
					this.ctx.drawImage( this.scratchCanvas, x, y );
					this.ctx.globalAlpha = 1;

				}
			}
		}

		if ( this.imageGridPieces.flat().filter( ( piece ) => piece.imageComplete ).length === this.imageGridPieces.flat().length ) {
			window.cancelAnimationFrame( this.loop );
			return;
		}

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

			this.canvas.width = this.imageCanvas.width = this.canvas.parentNode.getBoundingClientRect().width;
			this.canvas.height = this.imageCanvas.height = this.canvas.parentNode.getBoundingClientRect().width / this.el.aspectRatio;
			this.gridItemSize = ( this.canvas.height - ( this.gridGap * ( 100 / this.gridItemPercentage ) ) ) / ( 100 / this.gridItemPercentage );

			this.shapeSizes = {
				square: [ this.gridItemSize, this.gridItemSize ],
				wide: [ this.gridItemSize * 2 + this.gridGap, this.gridItemSize ],
				tall: [ this.gridItemSize, this.gridItemSize * 2 + this.gridGap ],
				squareLarge: [ this.gridItemSize * 2 + this.gridGap, this.gridItemSize * 2 + this.gridGap ],
			};

			this.imageCtx.drawImage(
				this.image,
				0, 0,
				this.canvas.width, this.canvas.height
			);

			this.imageGridPieces = [];
			this.filledCells = [];
			this.rows = Math.floor( this.canvas.height / ( this.gridItemSize + this.gridGap ) );
			this.cols = Math.ceil( this.canvas.width / ( this.gridItemSize + this.gridGap ) );
			this.currentRowCount = this.rows;
			this.currentColCount = this.cols;
			this.lastInRow = false;
			this.skip = false;

			this.debug = false;

			this.loop = null;

			this.defineGridPieces( this.el.getAttribute( 'data-img-pieces' ) );
			this.drawInitialView();
			this.startAnimation();
		};

		window.addEventListener( 'resize', onChange );
		document.body.addEventListener( 'themeChangeEvent', onChange );
	}
}

/**
 *
 */
export default () => {
	const imgs = [ ...document.querySelectorAll( 'img[data-img-pieces]' ) ];

	imgs.forEach( ( img ) => {

		const image = new Image();
		image.crossOrigin = 'Anonymous';

		/**
		 *
		 */
		image.onload = async () => {
			const imagePieces = new ImagePieces( img, image );
			await inView( img.parentNode );
			await delay( 500 );
			imagePieces.startAnimation();
		};
		image.src = img.src;

	} );
};

