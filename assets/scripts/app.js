/**
 * Entrypoint for the application JS.
 */

import React from 'react';
import { render } from 'react-dom';
import ContactForm from './components/ContactForm';
import activeMenu from './features/active-menu';
import contentAside from './features/content-aside';
import icons from './features/icons';
import Intro from './features/intro/Intro';
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
contentAside();
activeMenu();
wwwRedirect();
pageFeature();
lightbox();
syntaxHighlighting();

// Home page hero.
if ( document.querySelector( '.is-home .page-hero' ) ) {
	new Intro( document.querySelector( '.page-hero' ) );
}

// Contact form.
if ( document.getElementById( 'contact-form' ) ) {
	render( <ContactForm />, document.getElementById( 'contact-form' ) );
}
