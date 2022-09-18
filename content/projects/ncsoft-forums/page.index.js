const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-forums';

module.exports = {
	post: {
		type: 'project',
		date: '07/16/2010',
		title: 'NCSOFT forums',
		body: './index.md',
		summary: 'NCSOFT provided community forums for most of its games using Vbulletin and had community teams for each game that moderated and engaged with players. Community managers are often hired from within the game community and are already super active.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'vBulletin message boards',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: 'NCSOFT forums screen 1',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen2-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen2.jpg`,
				alt: 'NCSOFT forums screen 2',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen3-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen3.jpg`,
				alt: 'NCSOFT forums screen 3',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen4-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen4.jpg`,
				alt: 'NCSOFT forums screen 4',
			},
		],
		projectStillActive: false,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' ),
	},
};
