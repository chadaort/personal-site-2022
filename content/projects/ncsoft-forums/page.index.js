const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-forums';

module.exports = {
	post: {
		type: 'project',
		date: '07/16/2010',
		title: 'NCSOFT forums',
		body: './index.md',
		summary: 'NCSOFT provided community forums for most all games using Vbulletin. Each game had their own community team that would moderate and engage with players.',
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
