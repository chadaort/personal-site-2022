const pageHandler = require( '../../../../inc/page' );

module.exports = {
	post: {
		type: 'company',
		date: '7/24/2017',
		title: 'Snopes',
		body: './index.md',
		summary: 'Snopes is a fact checking company that sorts out myths and rumors on the internet. The company fights disinformation by identifying, exploring and correcting false information. My job at Snopes is managing our development efforts and I\'m hands-on, doing both front-end and back-end development.',
		tags: [ 'media' ]
	},
	meta: {
		displayDate: 'May 2017 - Present',
		subtitle: 'Fact Checking',
		companyType: 'Fact Checking',
		homePageList: true,
		employmentTimeframe: '2017 - Present',
		displayDate: 'Julu 2017 to Present',
		companyDesc: 'Snopes is a fact checking company that sorts out myths and rumors on the internet. The company fights disinformation by identifying, exploring and correcting false information. My job at Snopes is managing our development efforts and I\'m hands-on, doing both front-end and back-end development.',
		position: 'Lead Developer',
		hasSidebar: true,
		disableImageTreatments: true,
		projectUrl: 'https://www.snopes.com',
		featureImage: {
			src: 'assets/images/brands/snopes/banner.jpg',
			path: 'assets/images/brands/snopes',
			filePrefix: 'banner',
			alt: 'Snopes banner image',
			title: 'Snopes',
			summary: ''
		},
		logo: {
			src: 'assets/images/brands/snopes/logo',
			sizes: [ 360 ],
			maxWidth: '150px'
		}
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'company', siteMap, 3, 'random' )
	},
	content: {
		afterFeaturedImage: () => `
				<figcaption class="snopes__featured-banner-text">
					The definitive Internet reference source for researching
					<em>urban legends</em>, <em>folklore</em>, <em>myths</em>, <em>rumors</em> and <em>misinformation</em>.
				</figcaption>
			`
	}
};
