const pageHandler = require( '../../../inc/page' );

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'Prismjs integration',
		body: './index.md',
		summary: 'Considering this was to do a complete migration from custom field plugins, it was a perfect time to rethink how writers enter data for each of our content types. We met with several folks from the editorial team to better understand their workflow and what the pain points are in the classic editor.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Code Tips',
		homePageList: true,
		projectPosition: 'lead developer',
		hasSidebar: true,
		thumb: `assets/images/blog/prismjs-integration/thumb`,
		disableImageTreatments: true,
		featureImage: {
			src: 'assets/images/blog/prismjs-integration/banner.png',
			path: 'assets/images/blog/prismjs-integration',
			filePrefix: 'banner',
			something: '',
			alt: 'PrismJS integration banner image',
			title: 'Prismjs integration',
			summary: '',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'blog', siteMap, 3, 'random' ),
	},
};
