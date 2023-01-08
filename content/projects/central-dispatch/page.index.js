const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'webhook-consumer';

module.exports = {
	post: {
		type: 'project',
		date: '09/22/2020',
		title: 'Central Dispatch',
		body: './index.md',
		summary: 'At Snopes, we rely on several external systems and we also use a data warehouse to centralize reporting data for business intelligence. The biggest challenge on the reporting side is that we maintain our own accounts with direct bidders on our ad system and some of these companies have an archaic way of delivering reports, like over email.',
		tags: [ 'infrastructure' ],
	},
	meta: {
		subtitle: 'Infrastructure',
		projectPosition: 'lead developer',
		imageNamespace: namespace,
		featureImage: {
			alt: 'Central Dispatch banner',
		},
		hasSidebar: true,
		projectStillActive: true,
		disableImageTreatments: true,
		projectURL: 'https://www.snopes.com',
		anchorText: 'Read more about the <span>Central Dispatch project<span>',
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
							alt="Webhook Consumer project"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Central Dispatch</h3>
						<h2 class="page-link__title">Webhook Consumer</h2>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
