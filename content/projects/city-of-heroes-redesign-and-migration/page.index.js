const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'city-of-heroes-redesign-and-migration';

module.exports = {
	post: {
		type: 'project',
		date: '09/27/2011',
		title: 'City of Heroes redesign and migration',
		body: './index.md',
		summary: 'City of Heroes was a superhero game so it had a semi comic feel that made heavy use of primary blue and red. The studio had recently hired a new creative director who took the art from more a cartoon feel to high-end comic look.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'City of Heroes redesign and migration screen 1',
			},
		],
		projectStillActive: false,
		highlight: 'VGX Award for Best Multiplayer Game',
		anchorText: 'Read more about the <span>City of Heroes migration<span>',
		projectLink: `
			<article class="page-link page-link--wide-image project-${ namespace } project-align-right">
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
							alt="City of Heroes redesign and migration"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>

					<div class="page-link__copy">
						<h2 class="page-link__title">City of Heroes</h2>
						<h3 class="page-link__title-type">Redesign and migration</h3>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
