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
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: 'Carbine Studios screen 1',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen2-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen2.jpg`,
				alt: 'Carbine Studios screen 2',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen3-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen3.jpg`,
				alt: 'Carbine Studios screen 3',
			},
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' ),
	},
};
