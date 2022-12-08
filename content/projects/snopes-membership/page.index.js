const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'membership';

module.exports = {
	post: {
		type: 'project',
		date: '03/22/2021',
		title: 'Snopes membership',
		body: './index.md',
		summary: 'Our subscription billing system is powered by Chargebee and Auth0 serves as our authentication and authorization system. Additionally, we implemented single sign-on (SSO) to allow users to log in to the site, as well external system with one set of credentials.',
		tags: [ 'membership' ],
	},
	meta: {
		subtitle: 'Single Sign-On',
		homePageList: true,
		projectPosition: 'lead developer',
		imageNamespace: assetNamespace,
		featureImage: {
			alt: 'Snopes membership banner',
		},
		hasSidebar: true,
		projectStillActive: true,
		disableImageTreatments: true,
		projectURL: 'https://www.snopes.com/',
		anchorText: 'Read more about the <span>Snopes Membership work<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
