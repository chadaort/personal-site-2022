const pageHandler = require( '../../../inc/page' );

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'Block Editor Migration',
		body: './index.md',
		summary: 'It was a fair amount of work to migrate Snopes to the block editor since they have a lot of content that was written with the classic editor. The project was too big for me to handle alone, so we hired a project manager and a couple of developers from Human Made for five, two-week sprints.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		homePageList: true,
		projectPosition: 'lead developer',
		disableImageTreatments: true,
		hasSidebar: true,
		projectURL: 'https://www.snopes.com',
		imageNamespace: 'block-editor-migration',
		featureImage: {
			alt: 'Block editor migration banner image',
		},
		anchorText: 'Click here to read more about the <span>Block Editor migration work</span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'blog', siteMap, 2, 'random' ),
	},
};
