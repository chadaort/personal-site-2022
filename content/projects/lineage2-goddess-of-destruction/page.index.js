const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'lineage2-goddess-of-destruction';

module.exports = {
	post: {
		type: 'project',
		date: '05/29/2013',
		title: 'Lineage 2 Goddess of Destruction',
		body: './index.md',
		summary: 'Goddess of Destruction was an expansion pack for Lineage 2. Not all expansion packs got a microsite, but this one did because it was a huge update. The development team added 30 new hunting grounds, 60 new raid bosses, and more than 400 new equipment items, making this the most significant content update in the game\'s seven-year history.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Expansion microsite',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: 'Lineage 2 Goddess of Destruction screen',
			},
		],
		projectStillActive: true,
		projectURL: 'https://www.lineage2.com/',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' ),
	},
};
