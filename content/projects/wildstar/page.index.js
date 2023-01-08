const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'wildstar-launch';

module.exports = {
	post: {
		type: 'project',
		date: '06/03/2014',
		title: 'Wildstar launch',
		body: './index.md',
		summary: 'WildStar is a fantasy/science fiction MMO game developed by Carbine Studios. It was a pleasure to play the game, and I was blown away by the art. Game development can take a long time, and Wildstar was no exception. Free-to-play was introduced right when their game launched. It was just really inconvenient for everyone involved in the game.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Wildstar launch screen 1',
			},
			{
				alt: 'Wildstar launch screen 2',
			},
			{
				alt: 'Wildstar launch screen 3',
			},
		],
		projectStillActive: false,
		highlight: 'Most Innovative Game - PAX East',
		anchorText: 'Read more about the <span>Wildstar site launch<span>',
		projectLink: `
			<article class="page-link page-link--mockup-image project-${ namespace } project-align-right">
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
							alt="Wildstar launch site"
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
						<h3 class="page-link__title-type">Launch Site</h3>
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
