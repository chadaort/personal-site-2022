const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'carbine-studios-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '01/04/2012',
		title: 'Carbine Studios',
		body: './index.md',
		summary: 'Carbine Studios created Wildstar, a fantasy MMO game. The game was dazzling, and there was a lot of excitement leading up to its release. However, it wasn\'t until a couple of years before they had initially planned to launch that the market shifted towards free-to-play. It shook things up a bit within the company, but in the end, they decided to stick with the premium subscription model at launch. Less than a year after launch, they switch to the free-to-play model.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game studio site',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'Carbine Studios screen 1',
			},
			{
				alt: 'Carbine Studios screen 2',
			},
			{
				alt: 'Carbine Studios screen 3',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about the <span>Carbine Studios redesign<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
