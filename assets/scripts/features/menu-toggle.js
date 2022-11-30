import iconClose from '../partials/icons/close';

/**
 * Waits on a CSS property to fully transition and toggles a class name on the parent element.
 *
 * @param {string} transitioningClass Class name used for the transitioning state
 * @param {Element} el Element maintaining the classes
 * @param {Element} transitioningEl HTML element that's transitioning
 * @param {string} transitioningProp CSS property that we're waiting to complete
 * @param {boolean} addClass Add or remove transitioning class
 * @returns {Promise} Effectively void when the transition ends
 */
const waitOnTransition = ( transitioningClass, el, transitioningEl, transitioningProp, addClass = true ) => new Promise( ( resolve, reject ) => {
	if ( ! transitioningEl ) {
		reject();
	}
	transitioningEl.addEventListener( 'transitionend', function ( event ) {
		if ( event.propertyName === transitioningProp ) {
			resolve();
			transitioningEl.removeEventListener( 'transitionend', this );
		}
	} );

	if ( transitioningClass !== false ) {
		addClass ? el.classList.add( transitioningClass ) : el.classList.remove( transitioningClass );
	}
} );

/**
 * Menu toggle behavior.
 *
 * @param {boolean} active Is the menu active
 * @returns {undefined} Void
 */
const menuToggle = async ( active ) => {
	await waitOnTransition(
		'header__menu--transitioning-open',
		document.body,
		document.querySelector( '.header__controls-menu-toggle-icon' ),
		'left'
	);

	document.body.classList.toggle( 'blackout' );

	await waitOnTransition(
		'header__menu--active',
		document.body,
		document.querySelector( '.header__menu-wrapper' ),
		'width',
		! active
	);

	document.body.classList.remove( 'header__menu--transitioning-open' );

	const closeBtn = document.createElement( 'a' );
	closeBtn.className = 'menu-close';
	closeBtn.href = '#';
	closeBtn.innerHTML = iconClose( true, 'sm' );

	/**
	 * On menu close event.
	 *
	 * @param {Event} e Event interface
	 * @returns {undefined} Void
	 */
	const onCloseEvent = async ( e ) => {
		e.preventDefault();
		closeBtn.remove();

		await waitOnTransition(
			'header__menu--transitioning-close',
			document.body,
			document.querySelector( '.header__menu-wrapper' ),
			'width',
			! active
		);

		document.body.classList.remove( 'header__menu--active', 'blackout', 'header__menu--transitioning-close' );
		document.getElementById( 'header__controls-menu-toggle' ).ariaExpanded = 'false';
		closeBtn.removeEventListener( 'click', onCloseEvent );
		document.querySelector( '.body-blackout' ).removeEventListener( 'click', onCloseEvent );
	};

	closeBtn.addEventListener( 'click', onCloseEvent );
	document.querySelector( '.body-blackout' ).addEventListener( 'click', onCloseEvent );

	document.querySelector( '.header__menu-wrapper' ).appendChild( closeBtn );
};

/**
 * Adds menu toggle behavior.
 *
 * @returns {undefined} Void
 */
export default () => {
	const menuToggleBtn = document.getElementById( 'header__controls-menu-toggle' );
	if ( menuToggleBtn ) {
		menuToggleBtn.addEventListener( 'click', async () => {
			if ( document.getElementById( 'header__menu' ) ) {
				await menuToggle( document.body.classList.contains( 'header__menu--active' ) );
				menuToggleBtn.ariaExpanded = 'true';
			}
		} );
	}
};
