const pageHandler = require( '../../../inc/page' );

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'Block Editor Migration',
		body: './index.md',
		summary: 'It was a fair amount of work to migrate Snopes to the block editor since they have a lot of content that was written with the classic editor. The project was too big for me to handle alone, so we hired a project manager and a couple of developers from Human Made for five, two-week sprints.',
		tags: [ 'website' ]
	},
	meta: {
		subtitle: 'Game launch site',
		homePageList: true,
		projectPosition: 'lead developer',
		disableImageTreatments: true,
		hasSidebar: true,
		projectURL: 'https://www.snopes.com',
		thumb: `assets/images/blog/block-editor-migration/thumb`,
		featureImage: {
			src: 'assets/images/blog/block-editor-migration/banner.png',
			path: 'assets/images/blog/block-editor-migration',
			filePrefix: 'banner',
			something: '',
			alt: 'Block editor migration banner image',
			title: 'Block editor migration',
			summary: '',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'blog', siteMap, 3, 'random' )
	}
};
