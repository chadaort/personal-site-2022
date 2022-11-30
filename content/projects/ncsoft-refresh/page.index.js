const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-refresh';

module.exports = {
	post: {
		type: 'project',
		date: '11/21/2011',
		title: 'NCSOFT refresh',
		body: './index.md',
		summary: 'Corporate site changes, particularly redesigns, can have a challenging approval process, and this project was no exception. About a dozen stakeholders participated in the process in various capacities. While everyone agreed that our corporate website should focus on the studios instead of the publisher, getting all the studios to agree on a shared design proved challenging.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Publisher site',
		homePageList: true,
		projectPosition: 'lead developer',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'NCSOFT refresh screen 1',
			},
			{
				alt: 'NCSOFT refresh screen 2',
			},
		],
		projectStillActive: true,
		projectURL: 'https://us.ncsoft.com/en-us',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
