const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'ncsoft-forums';

module.exports = {
	post: {
		type: 'project',
		date: '07/16/2010',
		title: 'NCSOFT forums',
		body: './index.md',
		summary: 'NCSOFT provided community forums for most of its games using Vbulletin and had community teams for each game that moderated and engaged with players. Community managers are often hired from within the game community and are already super active.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'vBulletin message boards',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'NCSOFT forums screen 1',
			},
			{
				alt: 'NCSOFT forums screen 2',
			},
			{
				alt: 'NCSOFT forums screen 3',
			},
			{
				alt: 'NCSOFT forums screen 4',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about <span>NCSOFT forum work<span>',
		projectLink: `
			<article class="page-link page-link--mockup-image project-${ namespace }">
				<a class="page-link__a" href="${ config.siteUrl }/projects/${ namespace }/">

					<span class="page-link__bg-image-wrapper">
						<img
							class="page-link__bg-image"
							src="/assets/images/project/${ namespace }/${ namespace }--mockup.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=1200 1200w"
							alt="NCSOFT forums"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</span>

					<div class="page-link__copy">
						<h3 class="page-link__title-type">Forums</h3>
						<h2 class="page-link__title">NCSOFT</h2>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
