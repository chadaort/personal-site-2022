const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'city-of-heroes-redesign-and-migration';

module.exports = {
	post: {
		type: 'project',
		date: '09/27/2011',
		title: 'City of Heroes redesign and migration',
		body: './index.md',
		summary: 'City of Heroes was a superhero game so it had a semi comic feel that made heavy use of primary blue and red. The studio had recently hired a new creative director who took the art from more a cartoon feel to high-end comic look.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'City of Heroes redesign and migration screen 1',
			},
		],
		projectStillActive: false,
		highlight: 'VGX Award for Best Multiplayer Game',
		anchorText: 'Read more about the <span>City of Heroes migration<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
