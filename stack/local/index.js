/**
 * Creates local environment using Express.
 */

const path = require( 'path' );
const express = require( 'express' );
const pageHandler = require( '../../inc/page' );
const requestHandler = require( '../../inc/request' );
const sitemapHandlers = require( '../../inc/sitemap' );

const SOURCE_ASSETS = false;

const app = express();

const staticPath = process.cwd();

//const staticPath = path.join( process.cwd(), 'dist' );
app.disable( 'view cache' );
app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( process.cwd(), 'templates' ) );
app.use( express.static( staticPath ) );

sitemapHandlers.get()
	 .then( ( sitemap ) => {
		 app.get( '*', ( req, res ) => {

			 req.uri = req.url.slice( 1 );
			 const route = requestHandler( req );

			 if ( route.status === '301' ) {
				 res.redirect( route.headers.location[0].value );
			 }

			 let post = sitemap.find( ( data ) => data.uri === route.uri );

			 if ( ! post ) {
				 post = sitemap.find( ( data ) => data.uri === '404.html' );
			 }

			 const templateData = pageHandler.getRouteData( post.contentFile, sitemap );
			 const baseTemplate = templateData && templateData.meta.baseTemplate ? templateData.meta.baseTemplate : 'base';
			 return res.render( baseTemplate, { templateData } );
		 } );
	 } )
	 .then( () => app.listen( process.env.PORT || 3000 ) )
	 .catch( ( err ) => err );

