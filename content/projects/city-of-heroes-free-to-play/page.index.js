const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'city-of-heroes-free-to-play';

module.exports = {
	post: {
		type: 'project',
		date: '05/31/2012',
		title: 'City of Heroes',
		body: './index.md',
		summary: 'MMOs and other game genres started having challenging discussions when free-to-play came to the market to decide if they would move to a free-to-play model with micro-transactions. With City of Heroes on its last legs, it was clear it would need to convert to a free-to-play model to stay competitive. Even though it did not save COH, it was a financial improvement over the monthly subscription model.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Launches free to play',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'City of Heroes screen 1',
			},
			{
				alt: 'City of Heroes screen 2',
			},
			{
				alt: 'City of Heroes screen 3',
			},
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
