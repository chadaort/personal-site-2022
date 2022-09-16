const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'blade-and-soul-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '03/13/2012',
		title: 'Blade and Soul',
		body: './index.md',
		summary: 'Blade and Soul was developed by NCSOFT East and launched in the west about 9 after initially launching in the east. It was another beautiful game with a really rich story. My only complaint with the game has more to do with what free-to-play has done to gameplay in MMO\'s. ',
		tags: [ 'website' ],
	},
	meta: {
		homePageList: true,
		projectPosition: 'lead developer',
		subtitle: 'Teaser site',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: 'Blade and Soul screen 1',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen2-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen2.jpg`,
				alt: 'Blade and Soul screen 2',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen3-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen3.jpg`,
				alt: 'Blade and Soul screen 3',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen4-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen4.jpg`,
				alt: 'Blade and Soul screen 4',
			},
		],
		hasSidebar: true,
		projectStillActive: true,
		highlight: 'Presidential Award at the Korea Game Awards',
		projectURL: 'https://www.bladeandsoul.com/en-us',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' ),
	},
};
