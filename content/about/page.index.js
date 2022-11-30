const pageHandler = require( '../../inc/page.js' );

module.exports = {
	post: {
		type: 'about',
		date: '01/01/2018',
		title: 'Get to know me',
		body: './index.md',
		summary: '',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Working as an application developer',
		includeNestedChildren: true,
		hasSidebar: false,
	},
	filters: {
		contentData: ( data, siteMap ) => {
			data.companies = pageHandler.getPostsByType( 'company', siteMap );
			return data;
		},
	},
};
