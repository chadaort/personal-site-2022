const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'wordpress-zones-and-widgets-as-code';

module.exports = {
	post: {
		type: 'project',
		date: '10/23/2019',
		title: 'Wordpress zones and widgets as code',
		body: './index.md',
		summary: 'The product team wanted granular control over secondary content placements on the site. Widgets can be managed from the admin panel, but the user interface doesn\'t work well when there are lots of variations across post types. Although there are plugins like Custom Sidebars, they all failed to meet our business and code quality requirements.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'WordPress Plugin',
		imageNamespace: namespace,
		featureImage: {
			alt: 'Wordpress zones and widgets as code banner',
		},
		hasSidebar: true,
		disableImageTreatments: true,
		projectStillActive: true,
		projectURL: 'https://www.snopes.com',
		anchorText: 'Read more about the <span>WordPress widget plugin<span>',
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
							alt="Wordpress zones and widgets plugin"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>


					<div class="page-link__copy">
						<h2 class="page-link__title">
							<img src="/assets/images/logos/snopes-avatar.png" alt="Snopes" />
						</h2>
						<h3 class="page-link__title-type">WordPress Plugin - Advanced Widgets</h3>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
