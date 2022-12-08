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
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'NCSOFT forums screen 1',
			},
			{
				alt: 'NCSOFT forums screen 2',
			},
			{
				alt: 'NCSOFT forums screen 3',
			},
			{
				alt: 'NCSOFT forums screen 4',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about <span>NCSOFT forum work<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
