import animate from '../../helpers/canvas-animate';
import VideoPlayer from './VideoPlayer';

const GRID_ASSETS = [
	{
		type: 'image',
		asset: require( '/assets/images/project/aion-launch/aion-launch--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/aion-launch/aion-launch--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/blade-and-soul-teaser/blade-and-soul-teaser--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/blade-and-soul-teaser/blade-and-soul-teaser--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/guildwars2-launch/guildwars2-launch--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/guildwars2-launch/guildwars2-launch--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/lineage2-goddess-of-destruction/lineage2-goddess-of-destruction--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/lineage2-goddess-of-destruction/lineage2-goddess-of-destruction--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/ncsoft-redesign/ncsoft-redesign--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/ncsoft-redesign/ncsoft-redesign--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/tv-tropes/tv-tropes--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/tv-tropes/tv-tropes--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/carbine-studios-redesign/carbine-studios-redesign--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/carbine-studios-redesign/carbine-studios-redesign--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/city-of-heroes-free-to-play/city-of-heroes-free-to-play--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/city-of-heroes-free-to-play/city-of-heroes-free-to-play--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/city-of-heroes-going-rogue/city-of-heroes-going-rogue--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/city-of-heroes-going-rogue/city-of-heroes-going-rogue--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/element-gallery/element-gallery--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/element-gallery/element-gallery--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/lineage2-redesign/lineage2-redesign--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/lineage2-redesign/lineage2-redesign--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/lineage2-tauti/lineage2-tauti--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/lineage2-tauti/lineage2-tauti--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/wordpress-zones-and-widgets-as-code/wordpress-zones-and-widgets-as-code--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/wordpress-zones-and-widgets-as-code/wordpress-zones-and-widgets-as-code--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/membership/membership--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/membership/membership--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/webhook-consumer/webhook-consumer--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/webhook-consumer/webhook-consumer--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/wildstar-teaser/wildstar-teaser--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/wildstar-teaser/wildstar-teaser--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'image',
		asset: require( '/assets/images/project/my-aion/my-aion--thumb-intro.png?size=400' ),
		placeholder: require( '/assets/images/project/my-aion/my-aion--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'video',
		asset: require( '/assets/videos/wildstar-trailer.mp4' ),
		placeholder: require( '/assets/images/project/wildstar-launch/wildstar-launch--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
	{
		type: 'video',
		asset: require( '/assets/videos/guildwars2-trailer.mp4' ),
		placeholder: require( '/assets/images/project/guildwars2-teaser/guildwars2-teaser--thumb-intro.png?placeholder=true%26placeholderSize=400%26injectPlaceholder=true' ),
	},
];

const CANVAS_ASSETS = {
	topLeftMask: require( '/assets/images/light-intro-top-left-mask.png' ),
	bottomRightMask: require( '/assets/images/light-intro-btm-right-mask.png' ),
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

		this.container = container;

		this.canvas = document.createElement( 'canvas' );
		this.canvas.className = 'intro-grid';
		this.canvas.style.opacity = 0;
		this.container.appendChild( this.canvas );

		this.resizeCanvas = document.createElement( 'canvas' );
		this.gridCanvas = document.createElement( 'canvas' );

		this.setup( container );
	}

	/**
	 * Sets up the canvas.
	 *
	 * @param {Element} container Dom element
	 * @param reload
	 * @returns {undefined} Void
	 */
	async setup( container, reload = false ) {

		this.ctx = this.canvas.getContext( '2d' );
		this.canvas.width = this.container.getBoundingClientRect().width;
		this.canvas.height = this.container.getBoundingClientRect().height;
		this.ctx.imageSmoothingQuality = 'high';

		this.gridAssets = [];
		this.grid = this.calcGrid();
		this.theme = document.documentElement.getAttribute( 'data-theme' );
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

		if ( ! reload ) {
			this.changeHandler();
		}

		await this.onSceneReady();
		document.querySelector( '.hero-intro' ).classList.add( 'active' );
		this.loadAssets();

		this.animationFrame = window.requestAnimationFrame( () => this.draw() );
	}

	async onSceneReady() {

		const images = [
			document.querySelector( '.hero-intro__copy-bg-img' ),
			document.querySelector( '.hero-intro__copy-bg-img--dark' ),
		];

		if ( images.map( ( image ) => image.complete ).length === images.length ) {
			return;
		}

		/**
		 * Loads a scene image.
		 *
		 * @param {HTMLImageElement} domImage DOM image
		 * @returns {Promise}
		 */
		const loadImage = async ( domImage ) => {
			const image = new Image();
			image.addEventListener( 'load', () => {
				return;
			} );
			image.src = domImage.src;
		};

		await Promise.all( images.map( ( image ) => loadImage( image ) ) );
	}

	/**
	 * Prepares canvas assets.
	 *
	 * @returns {undefined} Void
	 */
	setupAssets() {

		const totalCount = this.grid.rows * this.grid.cols;
		let shuffledGridAssets = this.constructor.shuffle( GRID_ASSETS.map( ( x ) => {
			return { ...x };
		} ) );

		// Prevent videos on mobile to improve the lighthouse score.
		if ( this.deviceSize === 'mobile' ) {
			shuffledGridAssets = shuffledGridAssets.filter( ( item ) => item.type === 'image' );
		}

		shuffledGridAssets = shuffledGridAssets.map( ( item ) => {

			if ( window.site.env === 'local' ) {
				item.asset = item.asset.default;
				// We're not creating images locally so we're using a single blurred image for all placeholders.
				item.base64Placeholder = 'data:image/webp;base64,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';
			} else {

				item.base64Placeholder = item.placeholder.toString();

				if ( item.type === 'image' ) {
					item.asset = item.asset.src;
				}
			}
			return item;
		} );

		let currIndex = 0;
		while ( this.gridAssets.length < totalCount ) {
			const item = shuffledGridAssets[currIndex];
			const { type, base64Placeholder } = item;
			const data = {
				type,
				path: item.asset,
				base64Placeholder,
				placeholderOpacity: 0,
				gridImageOpacity: 0,
			};
			this.gridAssets.push( data );
			if ( currIndex >= shuffledGridAssets.length - 1 ) {
				currIndex = 0;
			}
			currIndex++;
		}
	}

	/**
	 * Loads canvas assets.
	 *
	 * @returns {undefined} Void
	 */
	loadAssets() {
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
			this.sceneImgs[key] = {
				path: window.site.env === 'local' ? CANVAS_ASSETS[key].default : CANVAS_ASSETS[key].src,
			};

			const img = new Image();
			img.addEventListener( 'load', () => {
				this.sceneImgs[key].img = img;
			} );
			img.src = this.sceneImgs[key].path;
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

		/**
		 * @param image
		 * @param event
		 */
		const drawImage = async ( event ) => {

			const image = event.path[0];
			const canvas = document.createElement( 'canvas' );
			canvas.width = this.grid.itemWidth;
			canvas.height = this.grid.itemHeight;

			const scale = canvas.width / image.width;
			const ctx = canvas.getContext( '2d' );
			const resizeCtx = this.resizeCanvas.getContext( '2d' );
			this.resizeCanvas.width = Math.round( image.width * scale );
			this.resizeCanvas.height = Math.round( image.height * scale );

			resizeCtx.clearRect( 0, 0, this.resizeCanvas.width, this.resizeCanvas.height );
			resizeCtx.drawImage( image, 0, 0, this.resizeCanvas.width, this.resizeCanvas.height );

			ctx.drawImage(
				this.resizeCanvas,
				0, 0,
				canvas.width, canvas.height,
				0, 0,
				canvas.width, canvas.height
			);

			if ( image.type === 'placeholder' ) {
				data.placeholder = canvas;

				await animate(
					data,
					{ placeholderOpacity: 1 },
					350,
					Math.round( ( Math.random() * 500 ) * 100 ) / 100
				);
				data.placeholderComplete = true;
				return;
			}

			data.brightness = this.constructor.getImageBrightness( canvas ) > 105 ? 'light' : 'dark';
			data.img = canvas;
			data.canvas = canvas;
			data.type = 'image';
			data.opacity = 0;

			await animate(
				data,
				{ gridImageOpacity: 1 },
				750,
				Math.round( ( Math.random() * ( 1200 - 850 ) ) + 850 * 100 ) / 100
			);

			data.animationComplete = true;
		};

		const placeholder = new Image();
		placeholder.type = 'placeholder';
		placeholder.crossOrigin = 'Anonymous';
		placeholder.onload = drawImage;
		placeholder.src = data.base64Placeholder;

		const image = new Image();
		image.type = 'main';
		image.crossOrigin = 'Anonymous';
		image.onload = drawImage;
		image.src = data.path;

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
		data.video.addEventListener( 'canplay', async () => {
			data.video.width = this.grid.itemWidth;
			data.video.height = this.grid.itemHeight;
			data.video.autoPlay = true;
			data.video.loop = true;
			data.video.muted = true;
			data.video.ready = true;
			data.video.play();

			await animate(
				data,
				{ gridImageOpacity: 1 },
				500,
				Math.round( ( Math.random() * ( 1200 - 350 ) ) + 350 * 100 ) / 100
			);
			data.animationComplete = true;
		} );
		data.video.src = data.path;

		const placeholder = new Image();
		placeholder.type = 'placeholder';
		placeholder.crossOrigin = 'Anonymous';

		/**
		 *
		 */
		placeholder.onload = async () => {

			const canvas = document.createElement( 'canvas' );
			canvas.width = this.grid.itemWidth;
			canvas.height = this.grid.itemHeight;

			const scale = canvas.width / placeholder.width;
			const ctx = canvas.getContext( '2d' );
			const resizeCtx = this.resizeCanvas.getContext( '2d' );
			this.resizeCanvas.width = Math.round( placeholder.width * scale );
			this.resizeCanvas.height = Math.round( placeholder.height * scale );

			resizeCtx.clearRect( 0, 0, this.resizeCanvas.width, this.resizeCanvas.height );
			resizeCtx.drawImage( placeholder, 0, 0, this.resizeCanvas.width, this.resizeCanvas.height );

			ctx.drawImage(
				this.resizeCanvas,
				0, 0,
				canvas.width, canvas.height,
				0, 0,
				canvas.width, canvas.height
			);

			data.placeholder = canvas;

			await animate(
				data,
				{ placeholderOpacity: 1 },
				500,
				Math.round( ( Math.random() * 350 ) * 100 ) / 100
			);
			data.placeholderComplete = true;
		};
		placeholder.src = data.base64Placeholder;
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

		if ( data.assets ) {
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
	}

	/**
	 * Draws a complex block.
	 *
	 * @param {object} data Block data
	 * @returns {undefined} Void
	 */
	drawComplexBlock( data ) {
		if ( ! data.instance || ! data.instance.canvas ) {
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

		const gridCtx = this.gridCanvas.getContext( '2d' );
		gridCtx.clearRect( data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );

		if ( data.placeholder ) {
			gridCtx.globalAlpha = data.placeholderOpacity;
			gridCtx.drawImage( data.placeholder, data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );
			gridCtx.globalAlpha = 1;
		}

		if ( ! data.video.ready ) {
			return;
		}

		const resizeVideo = this.resizeVideo( data.video );

		gridCtx.globalAlpha = data.gridImageOpacity;
		gridCtx.drawImage(
			resizeVideo,
			0, 0,
			this.grid.itemWidth, this.grid.itemHeight,
			data.x, data.y,
			this.grid.itemWidth, this.grid.itemHeight
		);
		gridCtx.globalAlpha = 1;

		/*
		gridCtx.globalAlpha = 0.35;
		gridCtx.fillStyle = 'black';
		gridCtx.fillRect( data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );
		gridCtx.globalAlpha = 1;
		*/
	}

	/**
	 * Draws an image block.
	 *
	 * @param {object} data Block data
	 * @returns {undefined} Void
	 */
	drawImageBlock( data ) {
		if ( ! data.canvas && ! data.placeholder ) {
			return false;
		}

		const gridCtx = this.gridCanvas.getContext( '2d' );

		if ( data.placeholder && ! data.animationComplete ) {
			gridCtx.globalAlpha = data.placeholderOpacity;
			gridCtx.drawImage( data.placeholder, data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );
			gridCtx.globalAlpha = 1;
		}

		if ( data.canvas ) {
			gridCtx.globalAlpha = data.gridImageOpacity;
			gridCtx.drawImage( data.canvas, data.x, data.y, this.grid.itemWidth, this.grid.itemHeight );
			gridCtx.globalAlpha = 1;
		}

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

		if ( this.gridAssets.length === this.gridAssets.filter( ( block ) => block.animationComplete ).length ) {
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

		this.updateGrid();
		this.drawGridColors();

		const originalCompOp = this.ctx.globalCompositeOperation;

		let masksLoaded = false;

		const gridCtx = this.gridCanvas.getContext( '2d' );

		gridCtx.fillStyle = 'rgba( 0, 0, 0, .15 )';
		gridCtx.fillRect( 0, 0, this.gridCanvas.width, this.gridCanvas.height );

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

			masksLoaded = true;
		}

		if ( masksLoaded ) {
			this.ctx.globalCompositeOperation = 'source-in';
		}

		this.ctx.drawImage( this.gridCanvas, 0, 0 );

		this.ctx.globalCompositeOperation = originalCompOp;
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
				&& Math.abs( this.renderedDimensions.height - document.documentElement.clientHeight ) < 100
			) {
				return;
			}

			window.cancelAnimationFrame( this.animationFrame );

			this.ctx.fillStyle = 'white';
			this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

			const resizeCtx = this.resizeCanvas.getContext( '2d' );
			resizeCtx.fillStyle = 'white';
			resizeCtx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

			const gridCtx = this.gridCanvas.getContext( '2d' );
			gridCtx.fillStyle = 'white';
			gridCtx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

			this.cachedGridCanvas = null;

			this.setup( document.querySelector( '.page-hero' ), true );
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
