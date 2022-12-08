const pageHandler = require( '../../../../inc/page.js' );

module.exports = {
	post: {
		type: 'company',
		date: '11/10/2008',
		title: 'NCSOFT',
		body: './index.md',
		summary: 'NCSOFT West has a long history of success in the online <strong>gaming industry</strong>. They have been in operation for over 20 years. In that time, they have won numerous awards and accolades. They are also one of the few publicly traded companies on the NASDAQ stock exchange. Their games include Guid Wars 2, Aion, Lineage 2, and City of Heroes, among others.',
		tags: [ 'gaming' ],
	},
	meta: {
		companyType: 'Video Games',
		subtitle: 'Video Games',
		homePageList: true,
		employmentTimeframe: '2008 <span>-</span> 2015',
		displayDate: 'November 2008 to March 2015',
		position: 'Lead Developer/Development Manager',
		companyDesc: 'NCSoft is a South Korean video game developer. The company has produced Lineage, City of Heroes, WildStar, Guild Wars, Aion, Blade & Soul, Exteel and Master X Master.',
		disableImageTreatments: true,
		projectUrl: 'https://us.ncsoft.com/en-us',
		imageNamespace: 'ncsoft',
		featureImage: {
			alt: 'NCSOFT banner image',
		},
		logo: {
			src: 'assets/images/brands/ncsoft/logo',
			sizes: [
				244,
			],
			maxWidth: '80px',
		},
		homeish: true,
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'company', siteMap, 2, 'random' );
		},
	},
};
