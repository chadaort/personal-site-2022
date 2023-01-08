const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'carbine-studios-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '01/04/2012',
		title: 'Carbine Studios',
		body: './index.md',
		summary: 'Carbine Studios created Wildstar, a fantasy MMO game. The game was dazzling, and there was a lot of excitement leading up to its release. However, it wasn\'t until a couple of years before they had initially planned to launch that the market shifted towards free-to-play. It shook things up a bit within the company, but in the end, they decided to stick with the premium subscription model at launch. Less than a year after launch, they switch to the free-to-play model.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game studio site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Carbine Studios screen 1',
			},
			{
				alt: 'Carbine Studios screen 2',
			},
			{
				alt: 'Carbine Studios screen 3',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about the <span>Carbine Studios redesign<span>',
		projectLink: `
			<article class="page-link page-link--diagonal-image project-${ namespace }">
				<a
					class="page-link__a"
					href="${ config.siteUrl }/projects/${ namespace }/">

					<div class="page-link__image-wrapper">
						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--16x9.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=1200 1200w"
							alt="Carbine Studios redesign"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>

					<div class="page-link__image-wrapper-left">
						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--16x9.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.png?size=1200 1200w"
							alt="Carbine Studios redesign alternative image"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>

					<div class="page-link__copy">
						<h2 class="page-link__title">Carbine Studios</h2>
						<h3 class="page-link__title-type">Redesign</h3>
					</div>

				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
