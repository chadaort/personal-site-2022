/**
 * SVG Icons
 * Searches for the class .icon and injects SVG based on the class name used.
 *
 * @returns {undefined} Void
 */
export default () => {
	const images = [ ...document.querySelectorAll( 'img[image-background-treatment]' ) ];

	images.forEach( ( image ) => {

		const canvasContainer = document.createElement( 'div' );
		const canvas = document.createElement( 'canvas' );
		const ctx = canvas.getContext( '2d' );

		const enlargeWidth = image.getBoundingClientRect().width * 0.04;
		const enlargeHeight = image.getBoundingClientRect().height * 0.04;
		canvas.width = image.getBoundingClientRect().width + enlargeWidth + 6;
		canvas.height  = image.getBoundingClientRect().height + enlargeHeight + 6;

		canvas.style.position = 'absolute';
		canvas.style.top = '-2px';
		canvas.style.right = '-2px';
		canvas.style.bottom = '-2px';
		canvas.style.left = '-2px';
		canvas.style.filter = 'blur( 3px )';

		// canvas.classList.add( 'lazy-canvas-image' );

		canvasContainer.style.width = `${ image.getBoundingClientRect().width + enlargeWidth }px`;
		canvasContainer.style.height = `${ image.getBoundingClientRect().height + enlargeHeight }px`;
		canvasContainer.style.zIndex = -1;
		canvasContainer.style.position = 'absolute';
		canvasContainer.style.top = `-${ enlargeHeight / 2 }px`;
		canvasContainer.style.left = `-${ enlargeWidth / 2 }px`;
		canvasContainer.style.opacity = .25;
		canvasContainer.style.overflow = 'hidden';

		const canvasImage = new Image();
		/**
		 *
		 */
		canvasImage.onload = () => {
			ctx.drawImage( canvasImage, 0, 0, canvas.width, canvas.height );
			ctx.fillStyle = '#65B9A8';
			ctx.globalCompositeOperation = 'multiply';
			ctx.globalAlpha = 0.6;
			ctx.fillRect( 0, 0, canvas.width, canvas.height );
		};
		canvasImage.src = image.src;

		canvasContainer.append( canvas );

		image.parentNode.style.position = 'relative';
		image.parentNode.insertBefore( canvasContainer, image );

	} );

};
