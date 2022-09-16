const pageHandler = require( '../../../../inc/page.js' );

module.exports = {
	post: {
		type: 'company',
		date: '1/8/2007',
		title: 'Project Thunder',
		body: './index.md',
		summary: 'I was brought on to work with clients and help them bring their visions to life. Many of the clients were established brands or personalities that already had some type of style guide and a sense of what they visually wanted out of  an online shop.',
		tags: ['ecommerce'],
	},
	meta: {
		companyType: 'Content Management System',
		subtitle: 'CRM + CMS',
		employmentTimeframe: '2007 - 2008',
		displayDate: 'January 2007 to August 2008',
		companyDesc: 'Project Thunder provided custom software development services for desktop, mobile and the web.',
		position: 'Developer',
		disableImageTreatments: true,
		featureImage: {
			src: `assets/images/brands/project-thunder/banner.png`,
			path: 'assets/images/brands/project-thunder',
			filePrefix: 'banner',
			alt: 'Project Thunder banner image',
			title: 'Project Thunder',
			summary: '',
		},
		logo: {
			src: 'assets/images/brands/project-thunder/logo',
			sizes: [ 249 ],
			maxWidth: '150px',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'company', siteMap, 3, 'random' );
		},
	},
}
