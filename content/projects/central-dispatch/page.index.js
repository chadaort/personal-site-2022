const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'webhook-consumer';

module.exports = {
	post: {
		type: 'project',
		date: '09/22/2020',
		title: 'Central Dispatch',
		body: './index.md',
		summary: 'At Snopes, we rely on several external systems and we also use a data warehouse to centralize reporting data for business intelligence. The biggest challenge on the reporting side is that we maintain our own accounts with direct bidders on our ad system and some of these companies have an archaic way of delivering reports, like over email.',
		tags: [ 'infrastructure' ],
	},
	meta: {
		subtitle: 'Infrastructure',
		projectPosition: 'lead developer',
		imageNamespace: assetNamespace,
		featureImage: {
			alt: 'Central Dispatch banner',
		},
		hasSidebar: true,
		projectStillActive: true,
		disableImageTreatments: true,
		projectURL: 'https://www.snopes.com',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
