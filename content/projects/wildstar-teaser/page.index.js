const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'wildstar-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '01/24/2013',
		title: 'Wildstar teaser',
		body: './index.md',
		summary: 'WildStar\'s concept art is stunning. Characters were quirky and colors were vibrant and saturated, giving it a dystopian cartoon feel. We struck a good balance between keeping the site user-friendly and maintaining the game\'s atmosphere.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch teaser',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'Wildstar teaser screen 1',
			},
			{
				alt: 'Wildstar teaser screen 2',
			},
			{
				alt: 'Wildstar teaser screen 3',
			},
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
