const pageHandler = require( '../../../../inc/page' );

module.exports = {
	post: {
		type: 'company',
		date: '7/24/2017',
		title: 'Snopes Media Group',
		shortTitle: 'Snopes',
		body: './index.md',
		summary: 'Snopes is an online <strong>fact-checking company</strong> that debunks myths and rumors. The company identifies, explores, and corrects false information to combat disinformation. I manage Snopes\' development efforts and do both front-end and back-end development. In addition, I support the editorial team\'s efforts, which have had more than 15 members since the property saw traffic as high as 60 million monthly visitors. ',
		tags: [ 'media' ],
	},
	meta: {
		subtitle: 'Fact Checking',
		companyType: 'Fact Checking',
		homePageList: true,
		employmentTimeframe: '2017 <span>-</span> Present',
		displayDate: 'July 2017 to Present',
		companyDesc: 'Snopes is a fact checking company that sorts out myths and rumors on the internet. The company fights disinformation by identifying, exploring and correcting false information. My job at Snopes is managing our development efforts and I\'m hands-on, doing both front-end and back-end development.',
		position: 'Lead Developer',
		hasSidebar: true,
		disableImageTreatments: true,
		projectUrl: 'https://www.snopes.com',
		imageNamespace: 'snopes',
		featureImage: {
			alt: 'Snopes banner image',
		},
		logo: {
			src: 'assets/images/brands/snopes/logo',
			sizes: [ 360 ],
			maxWidth: '150px',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'company', siteMap, 2, 'random' ),
	},
	content: {
		afterFeaturedImage: () => `
				<figcaption class="snopes__featured-banner-text">
					The definitive Internet reference source for researching
					<em>urban legends</em>, <em>folklore</em>, <em>myths</em>, <em>rumors</em> and <em>misinformation</em>.
				</figcaption>
			`,
	},
};
