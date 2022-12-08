const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'guildwars2-launch';

module.exports = {
	post: {
		type: 'project',
		date: '10/28/2012',
		title: 'Guild Wars 2',
		body: './index.md',
		summary: 'Due to Guild Wars\' popularity, Guild Wars 2 received a lot of hype before its release. ArenaNet had more autonomy than our other studios, so we usually supported them rather than fully managing their projects. They had decided to use WordPress for content publishing, and at that time, our servers team was adamant that we build static sites for marketing material.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'Guild Wars 2 screen 1',
			},
			{
				alt: 'Guild Wars 2 screen 2',
			},
			{
				alt: 'Guild Wars 2 screen 3',
			},
		],
		projectStillActive: true,
		projectURL: 'https://www.guildwars2.com/',
		highlight: '60+ million monthly visitors',
		anchorText: 'Read more about the <span>Guild Wars 2 launch<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
