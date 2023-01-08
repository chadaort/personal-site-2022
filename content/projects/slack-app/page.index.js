const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'slack-app';

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
		imageNamespace: namespace,
		featureImage: {
			alt: 'Slack Application banner',
		},
		anchorText: 'Read more about the <span>Snopes Slack application<span>',
		projectLink: `
			<article class="page-link page-link--wide-image project-${ namespace }">
				<a class="page-link__a" href="${ config.siteUrl }/projects/${ namespace }/">

					<div class="page-link__image-wrapper">
						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--16x9.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=1200 1200w"
							alt="Snopes Slack application"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Snopes</h3>
						<h2 class="page-link__title">Automation</h2>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'blog', siteMap, 2, 'random' ),
	},
};
