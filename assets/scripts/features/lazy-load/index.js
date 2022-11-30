import Parts from './effects/Parts';
import Pieces from './effects/Pieces';
import Pixels from './effects/Pixels';

/**
 * Builds a canvas that displays a grid of projects with a blended overlay.
 */
class LazyLoad {
	/**
	 * Sets up the class constructor
	 *
	 * @param image
	 */
	constructor( image ) {

		this.image = image;
		this.canvas = document.createElement( 'canvas' );
		this.canvas.classList.add( 'lazy-canvas-image' );
		this.ctx = this.canvas.getContext( '2d' );

		this.scratchCanvas = document.createElement( 'canvas' );
		this.scratchCtx = this.scratchCanvas.getContext( '2d' );

		const wrapper = document.createElement( 'div' );
		wrapper.classList.add( 'img-wrapper' );
		image.parentNode.insertBefore( wrapper, image );
		wrapper.appendChild( image );

		this.setup();
	}

	/**
	 * Sets up the canvas.
	 *
	 * @param image
	 * @param reload
	 * @returns {undefined} Void
	 */
	setup( reload = false ) {

		if ( this.image.getBoundingClientRect().width === 0 ) {
			return;
		}

		this.lazyType = ! this.image.getAttribute( 'data-lazy-load' ) || this.isAboveFold( this.image ) ? 'default' : this.image.getAttribute( 'data-lazy-load' );
		const imageStyles = getComputedStyle( this.image );
		this.canvas.width = this.image.getBoundingClientRect().width;
		this.canvas.height = this.image.getBoundingClientRect().height;
		this.canvas.style.zIndex = imageStyles.zIndex === 'auto' ? 1 : imageStyles.zIndex + 1;

		if ( ! reload ) {
			this.changeHandler();
			this.loadPlaceholderImage();
		}

		this.loadImage();
	}

	drawImage() {

		// If the container and image have the same aspect ratio then just draw the image.
		if ( this.canvasImage.width / this.canvasImage.height === this.canvas.width / this.canvas.height ) {
			this.ctx.drawImage( this.canvasImage, 0, 0, this.canvas.width, this.canvas.height );
			return;
		}

		// If the image doesn't fit perfectly in the container then we resize and crop the image to fit.
		// This supports using the object-fit property or a 100% width image with the overflow hidden.
		this.scratchCanvas.width = this.canvas.width;
		this.scratchCanvas.height = this.canvas.width / ( this.canvasImage.naturalWidth / this.canvasImage.naturalHeight );
		this.scratchCtx.clearRect( 0, 0, this.scratchCanvas.width, this.scratchCanvas.height );

		// Resize image.
		this.scratchCtx.drawImage(
			this.canvasImage,
			0, 0,
			this.scratchCanvas.width, this.scratchCanvas.height
		);

		// Crop image.
		this.ctx.drawImage(
			this.scratchCanvas,
			0, 0,
			this.canvas.width, this.canvas.height,
			0, 0,
			this.canvas.width, this.canvas.height
		);
	}

	loadPlaceholderImage() {
		/**
		 * Loads a placeholder image.
		 */
		const loadPlaceholder = () => {

			this.drawImage();

			switch ( this.lazyType ) {
				case 'pixels':
					this.instance = new Pixels( this.canvas, this.canvasImage, this.image.parentNode );
					break;

				case 'pieces':
					this.instance = new Pieces( this.canvas, this.canvasImage, this.image.parentNode );
					break;

				case 'parts':
					this.instance = new Parts( this.canvas, this.canvasImage, this.image.parentNode );
					break;

				default:
					break;
			}
		};

		this.canvasImage = new Image();
		this.canvasImage.addEventListener( 'load', loadPlaceholder );
		this.canvasImage.src = this.image.src;
		this.image.parentNode.insertBefore( this.canvas, this.image );
	}

	async onImageLoad( startTime = 0 ) {

		if ( startTime === 0 ) {
			this.startTime = performance.now();
		}

		this.image.setAttribute( 'data-lazy-load', 'loaded' );

		// If the image loads in less than 35ms we assumed it's been viewed already and load it quickly.
		if ( performance.now() - this.startTime <= 35 ) {

			if ( this.instance && this.instance.startAnimation ) {
				this.instance.startAnimation();
				return;
			}

			this.canvas.classList.add( 'lazy-canvas-image--deactivate-cached' );
			return;
		}

		await this.delay( 100 );

		if ( this.instance && this.instance.startAnimation ) {
			this.instance.startAnimation();
			return;
		}

		this.canvas.classList.add( 'lazy-canvas-image--deactivate' );
	}

	loadImage() {

		if ( ! this.image.hasAttribute( 'data-src' ) ) {
			this.onImageLoad( this.image, this.placeholder );
			return;
		}

		// If the image is above the fold or the device doesn't support IntersectionObserver then we load the images immediately.
		if ( this.isAboveFold( this.image ) || ! window.IntersectionObserver ) {
			this.image.addEventListener( 'load', () => this.onImageLoad( this.image, this.placeholder ) );
			this.image.src = this.image.dataset.src;
			this.image.removeAttribute( 'data-src' );

			if ( this.image.dataset.srcset ) {
				this.image.srcset = this.image.dataset.srcset;
				this.image.removeAttribute( 'data-srcset' );
			}
			return;
		}

		// Lazy load images.
		this.observer = new IntersectionObserver( ( entries, observer ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					const image = entry.target;
					const startTime = performance.now();

					image.addEventListener( 'load', () => this.onImageLoad( image, this.placeholder, startTime ) );
					image.src = image.dataset.src;

					if ( image.dataset.srcset ) {
						image.srcset = image.dataset.srcset;
					}

					this.observer.unobserve( image );
				}
			} );
		}, {
			threshold: 0.75,
		} );

		this.observer.observe( this.image );
	}

	/**
	 * Delays execution by n amount of time.
	 *
	 * @param {number} time The amount of time in milliseconds to delay execution
	 * @returns {Promise<undefined>}
	 */
	delay( time ) {
		return new Promise( ( resolve ) => setTimeout( resolve, time ) );
	}

	/**
	 * Determines an image is above the fold.
	 *
	 * @param {HTMLImageElement} image DOM image
	 * @returns {boolean} Is the image above the fold
	 */
	isAboveFold( image ) {
		return window.innerHeight > window.pageYOffset + image.getBoundingClientRect().top;
	}

	/**
	 * Handles when the canvas changes and needs reset.
	 *
	 * @returns {undefined} Void
	 */
	changeHandler() {
		window.addEventListener( 'resize', () => this.setup( true ) );
		document.body.addEventListener( 'themeChangeEvent', () => this.setup( true ) );
	}
}

export default /**
eeeeeeeeeeeeeee *
eeeeeeeeeeeeeee */
() => document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '[data-lazy-load]' ).forEach( ( image ) => new LazyLoad( image ) );
} );
