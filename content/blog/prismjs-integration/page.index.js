const pageHandler = require( '../../../inc/page' );

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'Prism.js integration',
		body: './index.md',
		summary: 'Considering this was to do a complete migration from custom field plugins, it was a perfect time to rethink how writers enter data for each of our content types. We met with several folks from the editorial team to better understand their workflow and what the pain points are in the classic editor.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Code Tips',
		homePageList: true,
		projectPosition: 'lead developer',
		hasSidebar: true,
		imageNamespace: 'prismjs-integration',
		disableImageTreatments: true,
		featureImage: {
			alt: 'Prism.js integration banner image',
		},
		anchorText: 'Click here to read more about the <span>Primis.js integration</span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'blog', siteMap, 2, 'random' ),
	},
};
