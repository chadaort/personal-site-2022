const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'my-aion';

module.exports = {
	post: {
		type: 'project',
		date: '11/16/2009',
		title: 'My Aion',
		body: './index.md',
		summary: 'My Aion was a player tool on the website that allowed players to create and customize their characters, find other players or guilds and even chat with them.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Bi-directional game data',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'My Aion screen 1',
			},
			{
				alt: 'My Aion screen 2',
			},
			{
				alt: 'My Aion screen 3',
			},
		],
		highlight: '25+ million monthly visitors',
		projectStillActive: false,
		anchorText: 'Read more about the <span>My Aion web application<span>',
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
							alt="My Aion"
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
							alt="My Aion app mockup" />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Player App</h3>
						<h2 class="page-link__title">My Aion</h2>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
