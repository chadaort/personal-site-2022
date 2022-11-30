const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'city-of-heroes-going-rogue';

module.exports = {
	post: {
		type: 'project',
		date: '10/17/2010',
		title: 'City of Heroes Going Rogue',
		body: './index.md',
		summary: 'Going Rogue was the second expansion pack for City of Heroes, which had already been online for six years. The art director for the studio did the site design so we could easily convert it to code. The majority of the design adjustments were related to localization. It was a fun design to work on.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Expansion pack microsite',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'City of Heroes Going Rogue screen 1',
			},
			{
				alt: 'City of Heroes Going Rogue screen 2',
			},
			{
				alt: 'City of Heroes Going Rogue screen 3',
			},
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
