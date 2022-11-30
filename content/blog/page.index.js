const pageHandler = require( '../../inc/page.js' );

module.exports = {
	post: {
		type: 'blog-posts',
		date: '09/18/2022',
		title: 'Blog Posts',
		body: './index.md',
		summary: '',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Random Writings',
		includeNestedChildren: true,
		hasSidebar: false,
		headerTitle: 'About Me',
		headerSubtitle: 'Just some history',
		pageTitle: 'A little bit about myself',
	},
	filters: {
		contentData: ( data, siteMap ) => {
			data.blog =  pageHandler.getPostsByType( 'blog', siteMap );
			return data;
		},
	},
};
