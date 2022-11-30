const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'wordpress-zones-and-widgets-as-code';

module.exports = {
	post: {
		type: 'project',
		date: '10/23/2019',
		title: 'Wordpress zones and widgets as code',
		body: './index.md',
		summary: 'The product team wanted granular control over secondary content placements on the site. Widgets can be managed from the admin panel, but the user interface doesn\'t work well when there are lots of variations across post types. Although there are plugins like Custom Sidebars, they all failed to meet our business and code quality requirements.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'WordPress Plugin',
		imageNamespace: assetNamespace,
		featureImage: {
			alt: 'Wordpress zones and widgets as code banner',
		},
		hasSidebar: true,
		disableImageTreatments: true,
		projectStillActive: true,
		projectURL: 'https://www.snopes.com',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
