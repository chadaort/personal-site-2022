const pageHandler = require( '../../../../inc/page.js' );

module.exports = {
	post: {
		type: 'company',
		date: '1/8/2007',
		title: 'Project Thunder',
		body: './index.md',
		summary: 'Project Thunder developed an <strong>e-commerce and CRM</strong> platform as an all-in-one solution. In the early 2000s, many brands and personalities were creating online stores and selling their products. Project Thunder provided services to create and manage online stores and customers for small and midsize businesses. ',
		tags: [ 'ecommerce' ],
	},
	meta: {
		companyType: 'Content Management System',
		subtitle: 'CRM + CMS',
		employmentTimeframe: '2007 <span>-</span> 2008',
		displayDate: 'January 2007 to August 2008',
		companyDesc: 'Project Thunder developed an e-commerce and CRM platform as an all-in-one solution. In the early 2000s, many brands and personalities were creating online stores and selling their products. Project Thunder provided services to create and manage online stores for small and midsize businesses. It was my job to help clients bring their visions to life.',
		position: 'Developer',
		disableImageTreatments: true,
		imageNamespace: 'project-thunder',
		featureImage: {
			alt: 'Project Thunder banner image',
		},
		logo: {
			src: 'assets/images/brands/project-thunder/logo',
			sizes: [ 249 ],
			maxWidth: '150px',
		},
	},
	filters: {
		sidebarData: ( data, siteMap ) => {
			return pageHandler.getPostsByType( 'company', siteMap, 2, 'random' );
		},
	},
};
