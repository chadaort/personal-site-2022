const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'ncsoft-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '04/20/2009',
		title: 'NCSOFT redesign',
		body: './index.md',
		summary: 'It was my first project at NCSOFT, and they brought me onto it midway through. Having worked with some of the developers previously, I fit right in. A few areas of the design were still in progress, but they had already completed most of the front-end styles. In addition, I was responsible for developing the site\'s interactivity and content management system.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Publisher site',
		imageNamespace: assetNamespace,
		featureImageSet: [
			{
				alt: 'NCSOFT redesign screen 1',
			},
			{
				alt: 'NCSOFT redesign screen 2',
			},
		],
		projectStillActive: true,
		highlight: '10+ million monthly visitors',
		projectURL: 'https://us.ncsoft.com/en-us',
		anchorText: 'Read more about the <span>NCSOFT redesign<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
