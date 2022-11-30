const pageHandler = require( '../../../inc/page.js' );

module.exports = {
	post: {
		type: 'blog',
		date: '01/01/2018',
		title: 'Personal Site Build',
		body: './index.md',
		summary: 'There are a few technologies that I have wanted to work with or extend my knowledge around, so I set out to do them on my website. To avoid maintaining a database, I chose not to use WordPress or another CMS. Using Webpack and Markdown files; I built a static site generator. It can be committed to Github and requires little maintenance. The infrastructure is defined in Javascript and provisioned in AWS using Pulumi.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'blog',
		homePageList: true,
		hasSidebar: true,
		imageNamespace: 'site-build',
		disableImageTreatments: true,
		featureImage: {
			alt: 'How I built this site banner image',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'blog', siteMap, 2, 'random' ),
	},
};
