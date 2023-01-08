const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'wildstar-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '01/24/2013',
		title: 'Wildstar teaser',
		body: './index.md',
		summary: 'WildStar\'s concept art is stunning. Characters were quirky and colors were vibrant and saturated, giving it a dystopian cartoon feel. We struck a good balance between keeping the site user-friendly and maintaining the game\'s atmosphere.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch teaser',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Wildstar teaser screen 1',
			},
			{
				alt: 'Wildstar teaser screen 2',
			},
			{
				alt: 'Wildstar teaser screen 3',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about the <span>Wildstar teaser site<span>',
		projectLink: `
			<article class="page-link page-link--mockup-image project-${ namespace }">
				<a class="page-link__a" href="${ config.siteUrl }/projects/${ namespace }/">

					<span class="page-link__bg-image-wrapper">
						<img
							class="page-link__bg-image"
							src="/assets/images/project/${ namespace }/${ namespace }--16x9.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=1200 1200w"
							alt="Wildstar teaser site"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</span>

					<div class="page-link__image-wrapper">
						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=1200"
							data-src="/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=1200 1200w"
							alt="Wildstar launch site mockup" />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Teaser site</h3>
						<h2 class="page-link__title">Wildstar</h2>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
