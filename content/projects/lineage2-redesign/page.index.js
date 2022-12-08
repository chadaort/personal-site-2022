const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'lineage2-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '03/28/2011',
		title: 'Lineage 2 redesign',
		body: './index.md',
		summary: 'As part of this project, we migrated a considerably large static site to a CMS and completely redesigned it. Since Lineage 2 was released in 2003, the website was due for a rework. Over time, the site had become a complete mess; 70%+ of all pages had detached from the Dreamweaver templates. In addition, a large content site built in Dreamweaver is a terrible idea, making it difficult to parse the content from all the markup and Dreamweaver code.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game site',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'Lineage 2 redesign screen 1',
			},
			{
				alt: 'Lineage 2 redesign screen 2',
			},
			{
				alt: 'Lineage 2 redesign screen 3',
			},
			{
				alt: 'Lineage 2 redesign screen 4',
			},
		],
		projectStillActive: true,
		highlight: '2018 Gamer\'s Choice Award',
		projectURL: 'https://www.lineage2.com/',
		anchorText: 'Read more about the <span>Lineage 2 redesign<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
