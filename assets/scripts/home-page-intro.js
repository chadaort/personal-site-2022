/**
 * Entrypoint for the home page intro JS.
 */

import Intro from './features/intro/Intro';

// Home page hero.
if ( document.querySelector( '.is-home .page-hero' ) ) {
	new Intro( document.querySelector( '.page-hero' ) );
}
