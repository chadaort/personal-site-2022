const pageHandler = require( '../inc/page.js' );

module.exports = {
	post: {
		type: 'home',
		date: '09/18/2022',
		title: 'Personal website of Chad Ort',
		body: './index.md',
		summary: '',
	},
	meta: {
		hasHero: true,
		hasFullPageHero: true,
		disablePageHeading: true,
		config: {
			hasHero: true,
		},
	},
	filters: {
		contentData: ( data, siteMap ) => {
			data.companies = pageHandler.getPostsByType( 'company', siteMap, 3 );
			data.blog = pageHandler.getPostsByType( 'blog', siteMap, 2 );
			return data;
		},
	},
};
