const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'wildstar-launch';

module.exports = {
	post: {
		type: 'project',
		date: '06/03/2014',
		title: 'Wildstar launch',
		body: './index.md',
		summary: 'WildStar is a fantasy/science fiction MMO game developed by Carbine Studios. It was a pleasure to play the game, and I was blown away by the art. Game development can take a long time, and Wildstar was no exception. Free-to-play was introduced right when their game launched. It was just really inconvenient for everyone involved in the game.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'Wildstar launch screen 1',
			},
			{
				alt: 'Wildstar launch screen 2',
			},
			{
				alt: 'Wildstar launch screen 3',
			},
		],
		projectStillActive: false,
		highlight: 'Most Innovative Game - PAX East',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
