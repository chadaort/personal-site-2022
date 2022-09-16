/**
 * Provides the behavior for the toggle buttons.
 *
 * @returns {undefined} Void
 */
export default () => {
	const themeToggleButtons = document.querySelectorAll( '[data-theme-toggle]' );
	const themeChangeEvent = new Event( 'themeChangeEvent' );
	themeToggleButtons.forEach( ( btn ) => {
		btn.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			const currentTheme = document.body.getAttribute( 'data-theme' ) ?? 'light';
			const activatedTheme = currentTheme === 'light' ? 'dark' : 'light';
			document.body.setAttribute( 'data-theme', activatedTheme );
			document.body.dispatchEvent( themeChangeEvent );
			window.localStorage.setItem( 'theme', activatedTheme );
		} );
	} );
};
