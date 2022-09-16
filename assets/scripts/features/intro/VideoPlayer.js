/**
 * Handles videos on canvas.
 */
export default class VideoPlayer {

	/**
	 * Sets up the class constructor
	 *
	 * @param {Element} intro Dom element
	 * @param {object} data Video data
	 * @returns {undefined} Void
	 */
	constructor( intro, data ) {
		this.setup( intro, data );
	}

	/**
	 * Sets up the canvas.
	 *
	 * @param {Element} intro Dom element
	 * @param {object} data Video data
	 * @returns {undefined} Void
	 */
	setup( intro, data ) {
		this.intro = intro;
		this.data = data;

		this.canvas = document.createElement( 'canvas' );
		this.ctx = this.canvas.getContext( '2d' );

		this.data.assets.video.autoPlay = true;
		this.data.assets.video.loop = true;
		this.data.assets.video.muted = true;

		this.canvas.width = this.intro.grid.itemWidth;
		this.canvas.height = this.intro.grid.itemHeight;

		this.animationFrame = window.requestAnimationFrame( () => this.draw() );
		this.draw();

		this.happened = false;
	}

	/**
	 * Draws the video on the canvas.
	 *
	 * @returns {undefined} Void
	 */
	draw() {
		this.ctx.fillStyle = 'red';
		this.ctx.fillRect( 0, 0, this.canvas.width, this.canvas.height );

		if ( ! this.happened ) {
			this.data.assets.video.play();
			this.happened = true;
		}

		this.ctx.drawImage( this.data.assets.video, 0, 0, this.canvas.width, this.canvas.height );

		this.animationFrame = window.requestAnimationFrame( () => this.draw() );
	}
}
