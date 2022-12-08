const pageHandler = require( '../../../inc/page' );

const assetNamespace = 'slack-app';

module.exports = {
	post: {
		type: 'project',
		date: '05/05/2022',
		title: 'Slack Application',
		body: './index.md',
		summary: 'Snopes publishes wire content from the Associated Press. It can be difficult to find articles since we don\'t have licenses for all articles, and from their website, it isn\'t clear which articles we have a license for. We created a Slack channel for each feed type that we want to monitor, and I created a Slack application to poll the feeds and update each channel when there is an update.',
		tags: [ 'application' ],
	},
	meta: {
		subtitle: 'Snopes.com',
		homePageList: true,
		projectPosition: 'lead developer',
		hasSidebar: true,
		disableImageTreatments: true,
		imageNamespace: assetNamespace,
		featureImage: {
			alt: 'Slack Application banner',
		},
		anchorText: 'Read more about the <span>Snopes Slack application<span>',
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'blog', siteMap, 2, 'random' ),
	},
};
