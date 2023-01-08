const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'city-of-heroes-going-rogue';

module.exports = {
	post: {
		type: 'project',
		date: '10/17/2010',
		title: 'City of Heroes Going Rogue',
		body: './index.md',
		summary: 'Going Rogue was the second expansion pack for City of Heroes, which had already been online for six years. The art director for the studio did the site design so we could easily convert it to code. The majority of the design adjustments were related to localization. It was a fun design to work on.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Expansion pack microsite',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'City of Heroes Going Rogue screen 1',
			},
			{
				alt: 'City of Heroes Going Rogue screen 2',
			},
			{
				alt: 'City of Heroes Going Rogue screen 3',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about the <span>City of Heroes - Going Rogue project<span>',
		projectLink: `
			<article class="page-link page-link--mockup-image project-${ namespace } project-align-right">
				<a class="page-link__a" href="${ config.siteUrl }/projects/${ namespace }/">

					<span class="page-link__bg-image-wrapper">
						<img
							class="page-link__bg-image"
							src="/assets/images/project/${ namespace }/${ namespace }--bg-image.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=1200 1200w"
							alt="City of Heroes Going Rogue"
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
							alt="City of Heroes Going Rogue site mockup" />
					</div>

					<div class="page-link__copy">
						<h2 class="page-link__title">City of Heroes</h2>
						<h3 class="page-link__title-type">Going Rogue</h3>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
