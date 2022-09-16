/**
 * A list of functions to retrieve details for routes, page data, and to aggregrate pages based on attributes.
 */

const fs = require( 'fs' );
const path = require( 'path' );
const { defaultsDeep } = require( 'lodash' );
const marked = require( 'marked' );
const config = require( '../config.js' );
const getSiteContent = require( '../content/site' );
const shuffle = require( './helpers/shuffle' );

// A list of properties that are required within the page meta.
const REQUIRED_PROPS = [ 'type', 'title', 'body', 'summary' ];

/**
 * Returns an object containing page and meta data based on the route.
 *
 * @param {string} contentFile The *.index.js file path for the route
 * @param {object} siteMap List of page URLs
 * @returns {object} Page and meta data
 */
const getRouteData = ( contentFile, siteMap ) => {
	let data = getPostData( contentFile );

	const assetManifestPath = path.join( process.cwd(), 'dist/asset-manifest.json' );
	data.assets = fs.existsSync( assetManifestPath ) ? { manifest: JSON.parse( fs.readFileSync( assetManifestPath, 'utf8' ) ) } : {};

	data.site = defaultsDeep(
		{ core: config },
		getSiteContent( siteMap )
	);

	if ( data.filters && data.filters.contentData ) {
		data = data.filters.contentData( data, siteMap );
	}

	if ( data.filters && data.filters.sidebarData ) {
		data.sidebar = data.filters.sidebarData( data, siteMap );
	}

	return data;
};

/**
 * Gets the page and meta data for the route using the content file path.
 *
 * @param {string} contentFile The *.index.js file path for the route
 * @returns {object} Page and meta data
 */
const getPostData = contentFile => {
	contentFile = contentFile ? contentFile : 'content/page.404.js';
	const contentPath = getRoutePath( contentFile ).content;
	const data = require( path.resolve( process.cwd(), contentFile ) );
	data.post = processMarkdownInProps( data.post, contentPath );
	data.post.publicPath = getRoutePath( contentFile ).public;
	data.meta = data.meta ? processMarkdownInProps( data.meta, contentPath ) : [];
	return data;
};

/**
 * Processing any Markdown file paths found within the page data.
 *
 * @param {object} pageData Page data
 * @param {string} pagePath Path location of the page
 * @returns {object} Page data
 */
const processMarkdownInProps = ( pageData, pagePath ) => {
	for ( const prop in pageData ) {
		if ( ( typeof pageData[ prop ] === 'string' || pageData[ prop ] instanceof String ) && pageData[ prop ].substring( pageData[ prop ].length - 3 ) === '.md' ) {
			pageData[ prop ] = marked( fs.readFileSync( path.resolve( pagePath, pageData[ prop ] ), { encoding: 'utf8' } ) );
		}
	}
	return pageData;
};

/**
 * Retrieves the details for the route.
 *
 * @param {string} contentFile The *.index.js file path for the route
 * @returns {object} Route location details
 */
const getRoutePath = contentFile => {
	const fileName = contentFile.split( '/' ).reverse()[0].split( '.' )[1];
	const contentPath = contentFile.substring( 0, contentFile.lastIndexOf( '/' ) + 1 );
	let publicPath = contentPath.split( 'content/' )[1] ? contentPath.split( 'content/' )[1] : '/';

	if ( publicPath === '/' && fileName === 'index' ) {
		// Home page.
		publicPath = `${ fileName }`;
	} else if ( publicPath === '/' ) {
		// Site root page.
		publicPath = `${ fileName }`;
	} else if ( fileName !== 'index' ) {
		// Page in folder but not index
		publicPath = `${ publicPath }/${ fileName }`;
	}

	return {
		content: contentPath,
		public: publicPath,
	};
};

/**
 * Validates that the required properties are set for page.
 *
 * @param {object} pageData Page data
 * @returns {string|boolean} Either an error message or true
 */
const validateData = pageData => {

	// Ensure that we have a data property.
	if ( ! pageData.post ) {
		return 'Page data must include a `data` property';
	}

	// Ensure the data property contains all properties defined in REQUIRED_PROPS
	if ( ! REQUIRED_PROPS.every( field => Object.prototype.hasOwnProperty.call( pageData.post, field ) ) ) {
		return `pageData.post must include the following properties ${ REQUIRED_PROPS.join( ', ' ) }.`;
	}

	return true;
};

/**
 * Get a list of pages based on the page type.
 * Page type is defined in page meta.
 *
 * @param {string} type Page type
 * @param {object} siteMap List of page URLs
 * @param {string} count Total number of pages to return
 * @param {string} sort Sort method
 * @returns {Array} An array of page data objects
 */
const getPostsByType = ( type, siteMap, count = 'all', sort = 'ascending' ) => {
	let postList = [];

	// Get a list of posts that match a certain type.
	const posts = siteMap.filter( data => data.type === type );

	// Get post data for each item.
	posts.forEach( post => postList.push( getPostData( post.contentFile ) ) );

	postList = sortPosts( postList, sort );

	if ( typeof count === 'number' ) {
		postList = postList.slice( 0, count );
	}

	return postList;
};

/**
 * Get a list of pages using a tag name.
 * Tag names are defined in the page meta.
 *
 * @param {string} tag Tag name associated the page
 * @param {Array} siteMap List of URLs
 * @param {number} count Total number of pages to return
 * @param {string} sort Sort method
 * @returns {Array} An array of page data objects
 */
const getPostsByTag = ( tag, siteMap, count = 'all', sort = 'ascending' ) => {
	let postList = [];

	// Get a list of posts that have a certain tag.
	const posts = siteMap.filter( data => data.tags.includes( tag ) );

	// Get post data for each item.
	posts.forEach( post => postList.push( getPostData( post.contentFile ) ) );

	postList = sortPosts( postList, sort );

	if ( typeof count === 'number' ) {
		postList = postList.slice( 0, count );
	}

	return postList;
};

/**
 * Sorts posts based on the sorting method.
 *
 * @param {Array} items A list of items to sort
 * @param {string} method Sort method
 * @returns {Array} List of sorted items
 */
const sortPosts = ( items, method ) => {

	switch ( method ) {
		case 'ascending':
			items = items.sort( ( a, b ) => new Date( b.post.date ) - new Date( a.post.date ) );
			break;

		case 'descending':
			items = items.sort( ( a, b ) => new Date( a.post.date ) - new Date( b.post.date ) );
			break;

		case 'random':
			items = shuffle( items );
			break;

		default:
			console.error( 'Encountered an unknown sort method.' );
	}
	return items;
};

module.exports = {
	getRouteData,
	getPostData,
	validateData,
	getRoutePath,
	getPostsByType,
	getPostsByTag,
};
