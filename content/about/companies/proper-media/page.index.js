const pageHandler = require( '../../../../inc/page.js' );

module.exports = {
	post: {
		type: 'company',
		date: '7/5/2016',
		title: 'Proper Media',
		body: './index.md',
		summary: 'I worked on their propiertary header bidding software, built a video player and did feature development on the properties that they managed or owned.',
		tags: ['advertising'],
	},
	meta: {
		companyType: 'Advertising',
		subtitle: 'Advertising',
		homePageList: true,
		employmentTimeframe: '2016 - 2017',
		displayDate: 'July 2016 to May 2017',
		companyDesc: 'Custom header bidding solutions that allow publishers to maximize ad revenue and reduce overhead.',
		position: 'Contract Developer',
		disableImageTreatments: true,
		projectUrl: 'http://propermedia.io/',
		featureImage: {
			src: `assets/images/brands/proper-media/banner.png`,
			path: 'assets/images/brands/proper-media',
			filePrefix: 'banner',
			alt: 'Proper Media banner image',
			title: 'Proper Media',
			summary: '',
		},
		logo: {
			src: 'assets/images/brands/proper-media/logo',
			sizes: [ 700 ],
			maxWidth: '150px',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'company', siteMap, 3, 'random' );
		},
	},
}
