const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'blade-and-soul-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '03/13/2012',
		title: 'Blade and Soul',
		body: './index.md',
		summary: 'Nine months after launching in the east, NCSOFT launched Blade and Soul in the west. This was another beautiful game with a vibrant story. In terms of gameplay, the only complaint I have with the game is how free-to-play has affected it. When a game was launched in the west, developed initially by NCSOFT east, a product team would be created to oversee the business plan and translate all the game content.',
		tags: [ 'website' ],
	},
	meta: {
		homePageList: true,
		projectPosition: 'lead developer',
		subtitle: 'Teaser site',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'Blade and Soul screen 1',
			},
			{
				alt: 'Blade and Soul screen 2',
			},
			{
				alt: 'Blade and Soul screen 3',
			},
			{
				alt: 'Blade and Soul screen 4',
			},
		],
		hasSidebar: true,
		projectStillActive: true,
		highlight: 'Presidential Award at the Korea Game Awards',
		projectURL: 'https://www.bladeandsoul.com/en-us',
		anchorText: 'Read more about the <span>Blade and Soul project<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
