const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'tv-tropes';

module.exports = {
	post: {
		type: 'project',
		date: '10/23/2015',
		title: 'TV Tropes',
		body: './index.md',
		summary: 'A wiki and forum redesign for TV Tropes was one of the projects I worked on at Proper Media. If you\'re one of those who notice patterns across the medium or want to understand the bits of storytelling better, TV Tropes is an excellent resource.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Site redesign',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: 'TV Tropes screen 1',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen2-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen2.jpg`,
				alt: 'TV Tropes screen 2',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen3-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen3.jpg`,
				alt: 'TV Tropes screen 3',
			},
		],
		projectStillActive: true,
		projectURL: 'https://tvtropes.org/',
		highlight: '20+ million monthly visitors',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' ),
	},
};
