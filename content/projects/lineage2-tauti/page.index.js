const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'lineage2-tauti';

module.exports = {
	post: {
		type: 'project',
		date: '06/13/2012',
		title: 'Lineage 2 Tauti',
		body: './index.md',
		summary: 'Lineage 2 Tauti was an expansion pack released after the game went free-to-play. The project was to create a micro-site that showcased the upcoming expansion pack. Development closely collaborated with the design team to streamline the process and reduce changes during the development phase. Despite some game data, the site was primarily informative and relatively straightforward.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game expansion microsite',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'Lineage 2 Tauti site screen 1',
			},
			{
				alt: 'Lineage 2 Tauti site screen 2',
			},
		],
		projectStillActive: true,
		projectURL: 'https://www.lineage2.com/',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
