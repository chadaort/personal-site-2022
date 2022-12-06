/**
 * Entrypoint for the application JS.
 */

import React from 'react';
import { render } from 'react-dom';
import ContactForm from './components/ContactForm';
import activeMenu from './features/active-menu';
import icons from './features/icons';
import imageBackgroundTreatment from './features/image-background-treatment';
import lazyLoad from './features/lazy-load/index';
import lightbox from './features/lightbox';
import menuToggle from './features/menu-toggle';
import pageFeature from './features/page-feature';
import syntaxHighlighting from './features/syntax-highlighting';
import themeToggle from './features/theme-toggle';
import wwwRedirect from './features/www-redirect';

if ( module.hot ) {
	module.hot.accept();
}

themeToggle();
menuToggle();
icons();
activeMenu();
wwwRedirect();
pageFeature();
lightbox();
syntaxHighlighting();
lazyLoad();
imageBackgroundTreatment();

// Contact form.
if ( document.getElementById( 'contact-form' ) ) {
	render( <ContactForm />, document.getElementById( 'contact-form' ) );
}

if ( 'serviceWorker' in navigator ) {
	window.addEventListener( 'load', () => {
		navigator.serviceWorker.register( '/service-worker.js' )
			.catch( ( error ) => console.log( `Service Worker Failed - ${ error }` ) );
	} );
}
