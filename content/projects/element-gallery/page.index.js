const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'element-gallery';

module.exports = {
	post: {
		type: 'project',
		date: '10/10/2008',
		title: 'Element gallery',
		body: './index.md',
		summary: 'Here\'s a fun design I found in my archive that I thought I\'d share. I made a lovely coming soon design with a chalkboard-like background, email signup, and a progress bar.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'A prelaunch site',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: 'Element gallery background image',
				title: 'Element gallery',
				summary: 'Element gallery screen 1',
			},
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' ),
	},
};
