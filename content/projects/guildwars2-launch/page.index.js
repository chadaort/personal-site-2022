const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'guildwars2-launch';

module.exports = {
	post: {
		type: 'project',
		date: '10/28/2012',
		title: 'Guild Wars 2',
		body: './index.md',
		summary: 'Due to Guild Wars\' popularity, Guild Wars 2 received a lot of hype before its release. ArenaNet had more autonomy than our other studios, so we usually supported them rather than fully managing their projects. They had decided to use WordPress for content publishing, and at that time, our servers team was adamant that we build static sites for marketing material.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Guild Wars 2 screen 1',
			},
			{
				alt: 'Guild Wars 2 screen 2',
			},
			{
				alt: 'Guild Wars 2 screen 3',
			},
		],
		projectStillActive: true,
		projectURL: 'https://www.guildwars2.com/',
		highlight: '60+ million monthly visitors',
		anchorText: 'Read more about the <span>Guild Wars 2 launch<span>',
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
							alt="Guild Wars 2 launch site"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</span>

					<div class="page-link__copy">
						<h3 class="page-link__title-type">Launch Site</h3>
						<h2 class="page-link__title">Guild Wars 2</h2>
						<h4 class="page-link__sub-title">60+ million monthly visitors</h4>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
