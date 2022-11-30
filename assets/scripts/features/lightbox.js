import lightboxElement from '../partials/lightbox';

/**
 * Lightbox behaviors.
 *
 * @returns {undefined} Void
 */
export default () => {
	const lightboxImages = document.querySelectorAll( '[data-lightbox-img]' );

	lightboxImages.forEach( ( img, index ) => {
		img.addEventListener( 'click', ( imageEvent ) => {
			imageEvent.preventDefault();

			const currentImg = img.getAttribute( 'data-lightbox-img' );

			if ( ! document.getElementById( 'lightbox' ) ) {
				document.body.insertAdjacentHTML( 'beforeend', lightboxElement() );
			}

			const lightbox = document.getElementById( 'lightbox' );

			lightbox.querySelector( '.lightbox__img' ).setAttribute( 'src', currentImg );
			lightbox.classList.add( 'lightbox--active' );
			lightbox.setAttribute( 'data-index', index );

			/**
			 * Lightbox click event callback function.
			 *
			 * @param {Event} controllerEvent Event interface
			 * @returns {undefined} Void
			 */
			const lightboxControlHandler = ( controllerEvent ) => {
				const currentIndex = Number( lightbox.getAttribute( 'data-index' ) );
				const targetId = controllerEvent.target.getAttribute( 'id' );
				let nextIndex;

				switch ( targetId ) {
					case 'lightbox-move-left':
					case 'lightbox-move-right':

						if ( ! lightboxImages.length ) {
							break;
						}

						nextIndex = targetId === 'lightbox-move-left'
							? currentIndex === 0 ? lightboxImages.length - 1 : currentIndex - 1
							: currentIndex === lightboxImages.length - 1 ? 0 : currentIndex + 1;

						lightbox.setAttribute( 'data-index', nextIndex );
						lightbox.querySelector( '.lightbox__img' ).setAttribute(
							'src',
							lightboxImages[nextIndex].getAttribute( 'data-lightbox-img' )
						);
						break;

					default:
						lightbox.classList.remove( 'lightbox--active' );
						lightbox.removeEventListener( 'click', lightboxControlHandler );
				}
			};

			/**
			 * @param {mouseEvent} mouseEvent
			 */
			const lightboxMouseHandler = ( mouseEvent ) => {

				const lightboxBounds = mouseEvent.target.getBoundingClientRect();
				const btnMarker = document.querySelector( '.btn-marker' );
				const btnMarkerBounds = btnMarker.getBoundingClientRect();

				switch ( mouseEvent.type ) {

					case 'mouseenter':
						btnMarker.classList.add( 'in' );
						btnMarker.style.top = `${ mouseEvent.clientY - ( btnMarkerBounds.height / 2 ) }px`;
						btnMarker.style.left = `${ mouseEvent.clientX - ( btnMarkerBounds.width / 2 ) }px`;
						break;

					case 'mouseleave':
						btnMarker.classList.remove( 'in' );
						break;

					case 'mousemove':
						if ( mouseEvent.clientX < lightboxBounds.left || mouseEvent.clientY < lightboxBounds.top || mouseEvent.clientX > lightboxBounds.left + lightboxBounds.width || mouseEvent.clientY > lightboxBounds.top + lightboxBounds.height ) {
							btnMarker.classList.remove( 'in' );
						}
						btnMarker.style.top = `${ mouseEvent.clientY - ( btnMarkerBounds.height / 2 ) }px`;
						btnMarker.style.left = `${ mouseEvent.clientX - ( btnMarkerBounds.width / 2 ) }px`;
						break;

					default:
						break;
				}
			};

			const lightboxBtnMarker = document.createElement( 'span' );
			lightboxBtnMarker.classList.add( 'btn-marker' );
			lightbox.append( lightboxBtnMarker );

			lightbox.addEventListener( 'click', lightboxControlHandler );
			lightbox.querySelector( '.lightbox__img-wrapper' ).addEventListener( 'mouseenter', lightboxMouseHandler, false );
			lightbox.querySelector( '.lightbox__img-wrapper' ).addEventListener( 'mousemove', lightboxMouseHandler, false );
			lightbox.querySelector( '.lightbox__img-wrapper' ).addEventListener( 'mouseleave', lightboxMouseHandler, false );
		} );
	} );
};
