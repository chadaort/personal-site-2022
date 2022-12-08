const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'element-gallery';

module.exports = {
	post: {
		type: 'project',
		date: '10/10/2008',
		title: 'Element gallery',
		body: './index.md',
		summary: 'I found this fun design in my archive and thought I\'d share it. With a chalkboard-like background, email signup, and a progress bar, I created a lovely coming soon design.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'A prelaunch site',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'Element gallery background image',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about the <span>Element Gallery project<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
