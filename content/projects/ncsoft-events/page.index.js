const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-events';

module.exports = {
	post: {
		type: 'project',
		date: '05/05/2010',
		title: 'NCSOFT events',
		body: './index.md',
		summary: 'In its role as a publisher, NCSOFT managed many events every year. We created a dedicated event site on a subdomain of ncsoft.com so that the event team could promote upcoming events and maintain an archive of all past events. Additionally, our sponsors wanted prime real estate that the company couldn\'t offer on the main property.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Public speaking events',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'NCSOFT events screen 1',
			},
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
