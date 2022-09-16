const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'aion-launch';

module.exports = {
	post: {
		type: 'project',
		date: '09/22/2009',
		title: 'Aion',
		body: './index.md',
		summary: 'This massive project is probably still the most significant project that I\'ve worked on. We deployed an entirely new CMS Alfresco with customized content workflows and launched a new site but we were also dealing with a lot of work from the industry shift towards free-to-play.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		homePageList: true,
		projectPosition: 'lead developer',
		thumb: `assets/images/content/${ assetNamespace }/thumb`,
		featureImageSet: [
			{
				src: `assets/images/content/${ assetNamespace }/screen1-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen1.jpg`,
				alt: 'Aion screen 1',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen2-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen2.jpg`,
				alt: 'Aion screen 2',
			},
			{
				src: `assets/images/content/${ assetNamespace }/screen3-thumb`,
				raw: `assets/images/content/${ assetNamespace }/screen3.jpg`,
				alt: 'Aion screen 3',
			},
		],
		hasSidebar: true,
		projectStillActive: true,
		projectURL: 'https://www.aiononline.com/',
		highlight: '20+ million <span>monthly visitors</span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 3, 'random' ),
	},
};
