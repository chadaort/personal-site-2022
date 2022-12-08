const pageHandler = require( '../../../../inc/page.js' );

module.exports = {
	post: {
		type: 'company',
		date: '7/5/2016',
		title: 'Proper Media',
		body: './index.md',
		summary: 'Proper Media is a technology company that provides digital media and <strong>advertising software and services</strong>. Proper Media\'s primary product is an ad-serving platform that helps publishers manage their advertising inventory and serve targeted ads to their audience.',
		tags: [ 'advertising' ],
	},
	meta: {
		companyType: 'Advertising',
		subtitle: 'Advertising',
		homePageList: true,
		employmentTimeframe: '2016 <span>-</span> 2017',
		displayDate: 'July 2016 to May 2017',
		companyDesc: 'Custom header bidding solutions that allow publishers to maximize ad revenue and reduce overhead.',
		position: 'Contract Developer',
		disableImageTreatments: true,
		projectUrl: 'http://propermedia.io/',
		imageNamespace: 'proper-media',
		featureImage: {
			alt: 'Proper Media banner image',
		},
		logo: {
			src: 'assets/images/brands/proper-media/logo',
			sizes: [ 700 ],
			maxWidth: '150px',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'company', siteMap, 2, 'random' );
		},
	},
};
