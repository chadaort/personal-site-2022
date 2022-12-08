const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ad-tech-video-player';

module.exports = {
	post: {
		type: 'project',
		date: '03/15/2016',
		title: 'Video player',
		body: './index.md',
		summary: 'The video advertising industry has been growing at a rapid pace for years. Proper Media wanted to create a video advertising platform for publishers. The platform allows publishers to upload videos or images to create slideshows so that ads can be injected during playback.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Ad tech',
		imageNamespace: assetNamespace,
		featureImage: {
			alt: 'Video player banner',
		},
		projectStillActive: true,
		highlight: '30+ million monthly views',
		projectURL: 'https://propermedia.io',
		anchorText: 'Read more about the <span>Proper Media video player<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
