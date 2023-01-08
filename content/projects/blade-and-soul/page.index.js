const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'blade-and-soul-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '03/13/2012',
		title: 'Blade and Soul',
		body: './index.md',
		summary: 'Nine months after launching in the east, NCSOFT launched Blade and Soul in the west. This was another beautiful game with a vibrant story. In terms of gameplay, the only complaint I have with the game is how free-to-play has affected it. When a game was launched in the west, developed initially by NCSOFT east, a product team would be created to oversee the business plan and translate all the game content.',
		tags: [ 'website' ],
	},
	meta: {
		homePageList: true,
		projectPosition: 'lead developer',
		subtitle: 'Teaser site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Blade and Soul screen 1',
			},
			{
				alt: 'Blade and Soul screen 2',
			},
			{
				alt: 'Blade and Soul screen 3',
			},
			{
				alt: 'Blade and Soul screen 4',
			},
		],
		hasSidebar: true,
		projectStillActive: true,
		highlight: 'Presidential Award at the Korea Game Awards',
		projectURL: 'https://www.bladeandsoul.com/en-us',
		anchorText: 'Read more about the <span>Blade and Soul project<span>',
		projectLink: `
			<article class="page-link page-link--mockup-image project-${ namespace }">
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
							alt="Blade and Soul teaser site"
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
							alt="Blade and Soul site mockups" />
					</div>

					<div class="page-link__copy">
						<h3 class="page-link__title-type">Teaser Site</h3>
						<h2 class="page-link__title" data-title="City of Heroes">
							Blade and Soul
							<span class="page-link__sub-title">60+ million monthly visitors</span>
						</h2>
					</div>

				</a>
			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
