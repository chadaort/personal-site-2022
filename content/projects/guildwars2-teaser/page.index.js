const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'guildwars2-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '06/01/2011',
		title: 'Guild Wars 2 teaser',
		body: './index.md',
		summary: 'ArenaNet, the studio behind Guild Wars, has some of the most loyal players on the market. So the release of Guild Wars 2 in 2012 was such an exciting time to work for NCSOFT. Daniel Dociu was the art director at ArenaNet who had the creative vision behind Guild Wars 2. The work he produces is stunning, and his management style fosters an environment where artists can flourish. This resulted in impressive art and a beautiful game. You can see his work here.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game teaser site',
		thumb: `assets/images/content/${assetNamespace}/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${assetNamespace}/screen1-thumb`,
				raw: `assets/images/content/${assetNamespace}/screen1.jpg`,
				alt: 'Guild Wars 2 teaser screen 1',
			},
			{
				src: `assets/images/content/${assetNamespace}/screen2-thumb`,
				raw: `assets/images/content/${assetNamespace}/screen2.jpg`,
				alt: 'Guild Wars 2 teaser screen 2',
			},
			{
				src: `assets/images/content/${assetNamespace}/screen3-thumb`,
				raw: `assets/images/content/${assetNamespace}/screen3.jpg`,
				alt: 'Guild Wars 2 teaser screen 3',
			},
		],
		projectStillActive: true,
		highlight: '#1 Video Game of 2012 - Time Magazine',
		projectURL: 'https://www.guildwars2.com/',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' ),
	},
};
