import VideoPlayer from './VideoPlayer';

const GRID_ASSETS = [
	'content/aion-launch/intro-thumb.png',
	'content/blade-and-soul-teaser/intro-thumb.png',
	// 'content/guildwars2-launch/intro-thumb.png',
	// 'content/lineage2-goddess-of-destruction/intro-thumb.png',
	'content/lineage2-goddess-of-destruction/intro-thumb-2.png',
	'content/ncsoft-redesign/intro-thumb.png',
	'content/tv-tropes/intro-thumb.png',
	// 'content/ad-tech-video-player/intro-thumb.png',
	'wildstar-trailer.mp4',
	'guildwars2-trailer.mp4',
	'content/carbine-studios-redesign/intro-thumb.png',
	'content/city-of-heroes-free-to-play/intro-thumb.png',
	'content/city-of-heroes-going-rogue/intro-thumb.png',
	'content/element-gallery/intro-thumb.png',
	'content/lineage2-redesign/intro-thumb.png',
	'content/lineage2-tauti/intro-thumb.png',
	// 'content/ncsoft-redesign/intro-thumb.png',
	// 'content/ncsoft-refresh/intro-thumb.png',
	'content/snopes/intro-thumb-2.png',
	// 'content/snopes-webhook-consumer/intro-thumb.png',
	'content/wildstar-teaser/intro-thumb.png',
	'content/my-aion/intro-thumb.png',
	'content/guildwars2-teaser/intro-thumb.png',
];

const CANVAS_ASSETS = {
	topLeftMask: 'light-intro-top-left-mask.png',
	bottomRightMask: 'light-intro-btm-right-mask.png',
};

const GRADIENT_COLORS = {
	light: [
		'#baabda',
		'#eec373',
		'#8fbdd3',
		'#bb6464',
		'#2f9986',
		'#c6d57e',
	],
	dark: [
		'#064663',
		'#700b97',
		'#d89216',
		'#519872',
		'#7b972a',
		'#2e3136',
	],
};

/**
 * Builds a canvas that displays a grid of projects with a blended overlay.
 */
export default class Intro {
	/**
	 * Sets up the class constructor
	 *
	 * @param {Element} container Dom element
	 */
	constructor( container ) {
		this.setup( container );
	}

	/**
	 * Sets up the canvas.
	 *
	 * @param {Element} container Dom element
	 * @returns {undefined} Void
	 */
	setup( container ) {
		this.container = container;

		this.canvas = document.createElement( 'canvas' );
		this.ctx = this.canvas.getContext( '2d' );
		this.canvas.width = this.container.getBoundingClientRect().width;
		this.canvas.height = this.container.getBoundingClientRect().height;
		this.ctx.imageSmoothingQuality = 'high';
		this.canvas.className = 'intro-grid';
		this.container.appendChild( this.canvas );

		this.resizeCanvas = document.createElement( 'canvas' );
		this.gridCanvas = document.createElement( 'canvas' );

		this.gridAssets = [];
		this.grid = this.calcGrid();
		this.theme = document.body.getAttribute( 'data-theme' );
		this.deviceSize = this.getDeviceSize();
		this.orientation = this.canvas.width > this.canvas.height ? 'landscape' : 'portrait';
		this.sceneImgs = {};
		this.lastTime = performance.now();
		this.timeElapsed = 0;
		this.renderedDimensions = {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
		};

		// Color gradient properties.
		this.colors = this.theme === 'dark' ? GRADIENT_COLORS.dark : GRADIENT_COLORS.light;
		this.animate = true;
		this.step = 0;
		this.colorIndices = [ 0, 1, 2, 3 ];
		this.gradientSpeed = 0.75;

		this.setupAssets();
		this.changeHandler();

		this.animationFrame = window.requestAnimationFrame( () => this.draw() );
	}

	/**
	 * Loads canvas assets.
	 *
	 * @returns {undefined} Void
	 */
	setupAssets() {
		const totalCount = this.grid.rows * this.grid.cols;
		const shuffledGridAssets = this.constructor.shuffle( GRID_ASSETS );

		let currIndex = 0;
		while ( this.gridAssets.length < totalCount ) {
			const item = shuffledGridAssets[currIndex];
			const data = typeof item === 'string' ? { path: item } : item;
			this.gridAssets.push( data );
			if ( currIndex >= shuffledGridAssets.length - 1 ) {
				currIndex = 0;
			}
			currIndex++;
		}

		for ( let i = 0; i < this.gridAssets.length; i++ ) {
			if ( this.gridAssets[i].path ) {
				const pathParts = this.gridAssets[i].path.split( '.' );
				if ( pathParts[pathParts.length - 1] === 'mp4' ) {
					this.loadVideoBlock( this.gridAssets[i] );
				} else {
					this.loadImageBlock( this.gridAssets[i] );
				}
			} else {
				this.loadComplexBlock( this.gridAssets[i] );
			}
		}

		Object.keys( CANVAS_ASSETS ).forEach( ( key ) => {
			this.sceneImgs[key] = { path: CANVAS_ASSETS[key] };

			const img = new Image();
			img.addEventListener( 'load', () => {
				this.sceneImgs[key].img = img;
			} );
			img.src = `${ window.location.origin }/assets/images/${ this.sceneImgs[key].path }`;
		} );
	}

	/**
	 * Determines the amount of rows, columns, gutters, and item sizes.
	 *
	 * @returns {object} Grid properties
	 */
	calcGrid() {
		let cols;

		if ( this.canvas.width < 768 ) {
			cols = 2;
		} else if ( this.canvas.width < 1400 ) {
			cols = 3;
		} else if ( this.canvas.width < 1800 ) {
			cols = 4;
		} else {
			cols = 5;
		}

		const gutter = 5;
		// We do columns minus 2 because there is no gutter on the outer edges.
		const xGutterTotal = ( cols - 2 ) * gutter;
		const itemWidth = Math.round( ( this.canvas.width - xGutterTotal ) / cols );
		const idealHeight = Math.round( itemWidth / ( 420 / 250 ) );

		let heightCounter = 0;
		let rows = 0;
		while ( heightCounter < this.canvas.height ) {
			heightCounter += idealHeight + gutter;
			rows++;
		}

		const difference = heightCounter - this.canvas.height - gutter;
		const cropHeight = ( difference - ( rows * gutter ) ) / rows;
		const itemHeight = Math.round( idealHeight - cropHeight );

		return {
			cols,
			rows,
			itemWidth,
			itemHeight,
			cropX: 0,
			cropY: 0,
			gutter,
		};
	}

	/**
	 * Loads an image.
	 *
	 * @param {object} data Image data
	 * @returns {undefined} Void
	 */
	loadImageBlock( data ) {
		const img = new Image();
		data.type = 'image';
		img.addEventListener( 'load', () => {
			data.canvas = document.createElement( 'canvas' );
			data.canvas.width = this.grid.itemWidth;
			data.canvas.height = this.grid.itemHeight;

			const scale = data.canvas.width / img.width;
			const ctx = data.canvas.getContext( '2d' );
			const resizeCtx = this.resizeCanvas.getContext( '2d' );
			this.resizeCanvas.width = Math.round( img.width * scale );
			this.resizeCanvas.height = Math.round( img.height * scale );

			resizeCtx.clearRect( 0, 0, this.resizeCanvas.width, this.resizeCanvas.height );
			resizeCtx.drawImage( img, 0, 0, this.resizeCanvas.width, this.resizeCanvas.height );

			ctx.drawImage(
				this.resizeCanvas,
				0, 0,
				data.canvas.width, data.canvas.height,
				0, 0,
				data.canvas.width, data.canvas.height
			);

			data.brightness = this.constructor.getImageBrightness( data.canvas ) > 105 ? 'light' : 'dark';
			data.img = data.canvas;
			data.opacity = 0;
		} );
		img.src = `${ window.location.origin }/assets/images/${ data.path }`;
	}

	/**
	 * Loads a video.
	 *
	 * @param {object} data Video data
	 * @returns {undefined} Void
	 */
	loadVideoBlock( data ) {
		data.type = 'video';
		data.video = document.createElement( 'video' );
		data.video.addEventListener( 'canplay', () => {
			data.video.width = this.grid.itemWidth;
			data.video.height = this.grid.itemHeight;
			data.video.autoPlay = true;
			data.video.loop = true;
			data.video.muted = true;
			data.video.ready = true;
			data.video.play();
		} );
		data.video.src = `${ window.location.origin }/assets/videos/${ data.path }`;
	}

	/**
	 * Loads a block with images and videos.
	 *
	 * @param {object} data Image data
	 * @returns {undefined} Void
	 */
	loadComplexBlock( data ) {
		data.type = 'complex';

		/**
		 * Loads an image.
		 *
		 * @param {string} path Image path
		 * @returns {undefined} Void
		 */
		const loadImg = async ( path ) => new Promise( ( resolve ) => {
			const img = new Image();
			/* eslint-disable jsdoc/require-jsdoc */
			img.onload = () => resolve( img );
			img.src = `${ window.location.origin }/assets/images/${ path }`;
		} );

		/**
		 * Loads a video.
		 *
		 * @param {string} path Video path
		 * @returns {undefined} Void
		 */
		const loadVid = async ( path ) => new Promise( ( resolve ) => {
			const vid = document.createElement( 'video' );
			vid.addEventListener( 'canplay', () => resolve( vid ) );
			vid.src = `${ window.location.origin }/assets/videos/${ path }`;
		} );

		Promise.all( Object.keys( data.assets ).map( ( key ) => {
			const pathParts = data.assets[key].split( '.' );

			if ( pathParts[pathParts.length - 1] === 'mp4' ) {
				return loadVid( data.assets[key] ).then( ( el ) => {
					data.assets[key] = el;
				} );
			}

			return loadImg( data.assets[key] ).then( ( el ) => {
				data.assets[key] = el;
			} );
		} ) ).then( () => {
			switch ( data.name ) {
				case 'video-player':
					data.instance = new VideoPlayer( this, data );
					break;

				default:
					break;
			}
		} );
	}

	/**
	 * Draws a complex block.
	 *
	 * @param {object} data Block data
	 * @returns {undefined} Void
	 */
	drawComplexBlock( data ) {
		if ( ! data.instance.canvas ) {
			return;
		}
		const gridCtx = this.gridCanvas.getContext( '2d' );
		gridCtx.clearRect( data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );
		gridCtx.drawImage( data.instance.canvas, data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );
	}

	/**
	 * Draws a video block.
	 *
	 * @param {object} data Block data
	 * @returns {undefined} Void
	 */
	drawVideoBlock( data ) {
		if ( ! data.video.ready ) {
			return;
		}
		const gridCtx = this.gridCanvas.getContext( '2d' );
		const resizeVideo = this.resizeVideo( data.video );

		gridCtx.clearRect( data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );
		gridCtx.drawImage(
			resizeVideo,
			0, 0,
			this.grid.itemWidth, this.grid.itemHeight,
			data.x, data.y,
			this.grid.itemWidth, this.grid.itemHeight
		);

		gridCtx.globalAlpha = 0.35;
		gridCtx.fillStyle = 'black';
		gridCtx.fillRect( data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );
		gridCtx.globalAlpha = 1;
	}

	/**
	 * Draws an image block.
	 *
	 * @param {object} data Block data
	 * @returns {undefined} Void
	 */
	drawImageBlock( data ) {
		if ( ! data.canvas ) {
			return false;
		}
		const gridCtx = this.gridCanvas.getContext( '2d' );
		gridCtx.drawImage( data.canvas, data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );

		return true;
	}

	/**
	 * Updates the main grid.
	 *
	 * @returns {undefined} Void
	 */
	updateGrid() {
		if ( ! this.cachedGridCanvas ) {
			this.drawGrid();
			return;
		}
		const gridCtx = this.gridCanvas.getContext( '2d' );
		gridCtx.clearRect( 0, 0, this.gridCanvas.width, this.gridCanvas.height );
		gridCtx.drawImage( this.cachedGridCanvas, 0, 0, this.cachedGridCanvas.width, this.cachedGridCanvas.height );

		for ( let i = 0; i < this.gridAssets.length; i++ ) {
			switch ( this.gridAssets[i].type ) {
				case 'video':
					this.drawVideoBlock( this.gridAssets[i] );
					break;

				case 'complex':
					this.drawComplexBlock( this.gridAssets[i] );
					break;

				default:
					break;
			}
		}
	}

	/**
	 * Draws the image grid.
	 *
	 * @returns {undefined} Void
	 */
	drawGrid() {
		const gridCtx = this.gridCanvas.getContext( '2d' );
		this.gridCanvas.width = this.canvas.width;
		this.gridCanvas.height = this.canvas.height;
		gridCtx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		let y = 0;
		let x = 0;
		let loopCounter = 0;
		let imgCounter = 0;
		let drawnImage = false;

		for ( let rows = 0; rows < this.grid.rows; rows++ ) {
			for ( let cols = 0; cols < this.grid.cols; cols++ ) {
				const blockData = this.gridAssets[loopCounter];

				// We will save the block's coordinates so that we can cache the grid and only redraw non-static blocks.
				blockData.x = x;
				blockData.y = y;

				switch ( blockData.type ) {
					case 'image':
						drawnImage = this.drawImageBlock( blockData );
						if ( drawnImage === true ) {
							imgCounter++;
						}
						break;

					case 'video':
						this.drawVideoBlock( blockData );
						break;

					case 'complex':
						this.drawComplexBlock( blockData );
						break;

					default:
						break;
				}

				gridCtx.globalAlpha = 1;
				x += this.grid.itemWidth + this.grid.gutter;
				loopCounter++;
			}
			y += this.grid.itemHeight + this.grid.gutter;
			x = 0;
		}

		if ( imgCounter === this.gridAssets.filter( ( block ) => block.type === 'image' ).length ) {
			this.cachedGridCanvas = document.createElement( 'canvas' );
			this.cachedGridCanvas.width = this.canvas.width;
			this.cachedGridCanvas.height = this.canvas.height;
			const cachedCtx = this.cachedGridCanvas.getContext( '2d' );
			cachedCtx.drawImage( this.gridCanvas, 0, 0, this.canvas.width, this.canvas.height );
		}
	}

	/**
	 * Draws the gradient with a blending mode over the grid.
	 *
	 * @returns {undefined} Void
	 */
	drawGridColors() {
		if ( ! this.gradientCanvas ) {
			this.gradientCanvas = document.createElement( 'canvas' );
		}

		const gridCtx = this.gridCanvas.getContext( '2d' );
		const defaultCompOp = gridCtx.globalCompositeOperation;
		const gradientCtx = this.gradientCanvas.getContext( '2d' );

		const colors = this.getGradientColors();

		// Clear the gradient canvas.
		this.gradientCanvas.width = this.canvas.width;
		this.gradientCanvas.height = this.canvas.height;
		gradientCtx.clearRect( 0, 0, this.canvas.width, this.canvas.height );

		gradientCtx.drawImage( this.gridCanvas, 0, 0, this.canvas.width, this.canvas.height );

		gradientCtx.globalCompositeOperation = 'source-in';

		const linearGradient = gradientCtx.createLinearGradient(
			0,
			0,
			this.canvas.width,
			this.canvas.height
		);
		linearGradient.addColorStop( 0, `rgb( ${ colors[0].r }, ${ colors[0].g }, ${ colors[0].b } )` );
		linearGradient.addColorStop( 1, `rgb( ${ colors[1].r }, ${ colors[1].g }, ${ colors[1].b } )` );

		gradientCtx.fillStyle = linearGradient;
		gradientCtx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		gradientCtx.globalCompositeOperation = defaultCompOp;
		gradientCtx.globalAlpha = 1;

		gridCtx.globalCompositeOperation = 'multiply';
		gridCtx.globalAlpha = this.theme === 'light' ? 0.7 : 0.75;

		gridCtx.drawImage( this.gradientCanvas, 0, 0, this.canvas.width, this.canvas.height );

		gridCtx.globalCompositeOperation = defaultCompOp;
		gridCtx.globalAlpha = 1;
	}

	/**
	 * Draw the main canvas.
	 *
	 * @returns {undefined} Void
	 */
	draw() {
		this.timeElapsed = performance.now() - this.lastTime;
		this.ctx.clearRect( 0, 0, this.canvas.width, this.canvas.height );
		const test = this.ctx.globalCompositeOperation;

		this.updateGrid();
		this.drawGridColors();

		if ( this.sceneImgs.topLeftMask && this.sceneImgs.topLeftMask.img && this.sceneImgs.bottomRightMask && this.sceneImgs.bottomRightMask.img ) {
			const defaultCompOp = this.ctx.globalCompositeOperation;

			const topLeftMask = this.sceneImgs.topLeftMask.img;
			const topLeftWidthPercent = this.deviceSize === 'mobile' ? 100 : 80;
			const topLeftMaskWidth = ( topLeftWidthPercent / 100 ) * this.canvas.width;
			this.ctx.drawImage(
				topLeftMask,
				0,
				0,
				topLeftMaskWidth,
				Math.round( topLeftMaskWidth / ( topLeftMask.width / topLeftMask.height ) )
			);

			const btmRightMask = this.sceneImgs.bottomRightMask.img;
			const btmRightWidthPercent = this.deviceSize === 'mobile' ? 100 : 90;
			const btmRightMaskWidth = ( btmRightWidthPercent / 100 ) * this.canvas.width;
			const btmRightMaskHeight = Math.round( btmRightMaskWidth / ( btmRightMask.width / btmRightMask.height ) );

			this.ctx.drawImage(
				btmRightMask,
				this.canvas.width - btmRightMaskWidth,
				this.canvas.height - btmRightMaskHeight,
				btmRightMaskWidth,
				btmRightMaskHeight
			);

			this.ctx.globalCompositeOperation = 'source-in';

			this.ctx.drawImage( this.gridCanvas, 0, 0 );

			this.ctx.globalCompositeOperation = defaultCompOp;
		}

		this.ctx.globalCompositeOperation = test;
		this.lastTime = performance.now();
		this.animationFrame = window.requestAnimationFrame( () => this.draw() );
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

			// Prevents unexpected resize events on mobile devices.
			// Measuring the height to ensure that the resize event fires when dev tools is open/closed.
			if (
				this.renderedDimensions.width === document.documentElement.clientWidth
				|| Math.abs( this.renderedDimensions.height - document.documentElement.clientWidth ) < 100
			) {
				return;
			}

			window.cancelAnimationFrame( this.animationFrame );
			this.canvas.width = this.container.getBoundingClientRect().width;
			this.canvas.height = this.container.getBoundingClientRect().height;
			this.theme = document.body.getAttribute( 'data-theme' );
			this.deviceSize = this.getDeviceSize();
			this.orientation = this.canvas.width > this.canvas.height ? 'landscape' : 'portrait';
			this.colors = this.theme === 'dark' ? GRADIENT_COLORS.dark : GRADIENT_COLORS.light;
			this.gridAssets = [];
			this.sceneImgs = {};
			this.grid = this.calcGrid();
			this.setupAssets();
			delete this.cachedGridCanvas;
			this.animationFrame = window.requestAnimationFrame( () => this.draw() );
			this.renderedDimensions.width = document.documentElement.clientWidth;
			this.renderedDimensions.height = document.documentElement.clientHeight;
		};

		window.addEventListener( 'resize', onChange );
		document.body.addEventListener( 'themeChangeEvent', onChange );
	}

	/**
	 * Gets the next step in a gradient animation.
	 *
	 * @returns {Array} An array of two rgb value arrays.
	 */
	getGradientColors() {
		const innerColor = this.constructor.hexToRgb( this.colors[this.colorIndices[0]] );
		const innerColorNext = this.constructor.hexToRgb( this.colors[this.colorIndices[1]] );
		const outerColor = this.constructor.hexToRgb( this.colors[this.colorIndices[2]] );
		const outerColorNext = this.constructor.hexToRgb( this.colors[this.colorIndices[3]] );
		this.step += Number( `.00${ this.gradientSpeed.toString().substring( 2 ) }` );
		const stepDifference = 1 - this.step;

		const colors = [
			{
				r: Math.round( ( stepDifference * innerColor[0] ) + ( this.step * innerColorNext[0] ) ),
				g: Math.round( ( stepDifference * innerColor[1] ) + ( this.step * innerColorNext[1] ) ),
				b: Math.round( ( stepDifference * innerColor[2] ) + ( this.step * innerColorNext[2] ) ),
			},
			{
				r: Math.round( stepDifference * outerColor[0] + this.step * outerColorNext[0] ),
				g: Math.round( stepDifference * outerColor[1] + this.step * outerColorNext[1] ),
				b: Math.round( stepDifference * outerColor[2] + this.step * outerColorNext[2] ),
			},
		];

		if ( this.step >= 1 ) {
			this.step %= 1;
			const [ , indice1, , indice3 ] = this.colorIndices;
			const { length } = this.colors;
			this.colorIndices[0] = indice1;
			this.colorIndices[2] = indice3;

			this.colorIndices[1] = ( indice1 + Math.floor( 1 + Math.random() * ( length - 1 ) ) ) % length;
			this.colorIndices[3] = ( indice3 + Math.floor( 1 + Math.random() * ( length - 1 ) ) ) % length;
		}

		return colors;
	}

	/**
	 * Get a string representation of the device size.
	 *
	 * @returns {string} Modile device size
	 */
	getDeviceSize() {
		if ( this.canvas.width > 740 ) {
			return 'tablet';
		} if ( this.canvas.width > 980 ) {
			return 'desktop';
		} if ( this.canvas.width > 1400 ) {
			return 'wide';
		}
		return 'mobile';
	}

	/**
	 * Resizes a video frame.
	 *
	 * @param {Element} video Video element
	 * @returns {HTMLCanvasElement} Canvas image of the resized video frame
	 */
	resizeVideo( video ) {
		const resizeCtx = this.resizeCanvas.getContext( '2d' );
		const scale = Math.min( this.grid.itemWidth / video.width, this.grid.itemHeight / video.height );
		this.resizeCanvas.width = video.width * scale;
		this.resizeCanvas.height = video.height * scale;
		resizeCtx.clearRect( 0, 0, video.width * scale, video.height * scale );
		resizeCtx.drawImage( video, 0, 0, video.width * scale, video.height * scale );
		return this.resizeCanvas;
	}

	/**
	 * Gets the brightness values of an image.
	 *
	 * @param {Element} imgCanvas Image canvas element
	 * @returns {number} Image brightness
	 */
	static getImageBrightness( imgCanvas ) {
		const imageData = imgCanvas.getContext( '2d' ).getImageData( 0, 0, imgCanvas.width, imgCanvas.height ).data;

		let r;
		let g;
		let b;
		let avg;
		let colorSum = 0;

		for ( let x = 0, len = imageData.length; x < len; x += 4 ) {
			r = imageData[x];
			g = imageData[x + 1];
			b = imageData[x + 2];

			avg = Math.floor( ( r + g + b ) / 3 );
			colorSum += avg;
		}

		return Math.floor( colorSum / ( imgCanvas.width * imgCanvas.height ) );
	}

	/**
	 * Shuffles an array.
	 *
	 * @param {Array} list An array
	 * @returns {Array} Shuffled array
	 */
	static shuffle( list ) {
		let currentIndex = list.length;
		let randomIndex;

		// While there remain elements to shuffle.
		while ( currentIndex !== 0 ) {
			// Pick a remaining element.
			randomIndex = Math.floor( Math.random() * currentIndex );
			currentIndex--;

			// And swap it with the current element.
			[ list[currentIndex], list[randomIndex] ] = [ list[randomIndex], list[currentIndex] ];
		}

		return list;
	}

	/**
	 * Converts a hex value to rgb within an array.
	 *
	 * @param {string} hex Hex value with preceding #
	 * @returns {Array} RGB color values
	 */
	static hexToRgb( hex ) {
		return [
			parseInt( hex.slice( 1, 3 ), 16 ),
			parseInt( hex.slice( 3, 5 ), 16 ),
			parseInt( hex.slice( 5, 7 ), 16 ),
		];
	}
}
