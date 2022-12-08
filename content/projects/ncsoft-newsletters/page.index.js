const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-newsletters';

module.exports = {
	post: {
		type: 'project',
		date: '03/01/2010',
		title: 'NCSOFT newsletters',
		body: './index.md',
		summary: 'As the publisher, NCSOFT managed all the newsletters for any current and upcoming games. Some games had multiple newsletters with varying frequencies and had a reasonably heavy design. Newsletter development at that time was messy. Outlook used Word to render their emails, and Yahoo had its quirks.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: '6-8 propties, once a week',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'NCSOFT newsletters screen 1',
			},
			{
				alt: 'NCSOFT newsletters screen 2',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about <span>NCSOFT newsletter work<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
