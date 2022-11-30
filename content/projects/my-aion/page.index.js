const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'my-aion';

module.exports = {
	post: {
		type: 'project',
		date: '11/16/2009',
		title: 'My Aion',
		body: './index.md',
		summary: 'My Aion was a player tool on the website that allowed players to create and customize their characters, find other players or guilds and even chat with them.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Bi-directional game data',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'My Aion screen 1',
			},
			{
				alt: 'My Aion screen 2',
			},
			{
				alt: 'My Aion screen 3',
			},
		],
		highlight: '25+ million monthly visitors',
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
