const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'guildwars2-teaser';

module.exports = {
	post: {
		type: 'project',
		date: '06/01/2011',
		title: 'Guild Wars 2 teaser',
		body: './index.md',
		summary: 'ArenaNet, the studio behind Guild Wars, has some of the most loyal players on the market. So the release of Guild Wars 2 in 2012 was such an exciting time to work for NCSOFT. Daniel Dociu was the art director at ArenaNet who had the creative vision behind Guild Wars 2. The work he produces is stunning, and his management style fosters an environment where artists can flourish. This resulted in impressive art and a beautiful game. You can see his work here.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game teaser site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Guild Wars 2 teaser screen 1',
			},
			{
				alt: 'Guild Wars 2 teaser screen 2',
			},
			{
				alt: 'Guild Wars 2 teaser screen 3',
			},
		],
		projectStillActive: true,
		highlight: '#1 Video Game of 2012 - Time Magazine',
		projectURL: 'https://www.guildwars2.com/',
		anchorText: 'Read more about the <span>Guild Wars 2 teaser site<span>',
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
							alt="Guild Wars 2 teaser site"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</span>

					<div class="page-link__copy">
						<h3 class="page-link__title-type">Teaser Site</h3>
						<h2 class="page-link__title">Guild Wars 2</h2>
						<h4 class="page-link__sub-title"><span>60+ million</span> monthly visitors</h4>
					</div>

				</a>
			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
