const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'lineage2-tauti';

module.exports = {
	post: {
		type: 'project',
		date: '06/13/2012',
		title: 'Lineage 2 Tauti',
		body: './index.md',
		summary: 'Lineage 2 Tauti was an expansion pack released after the game went free-to-play. The project was to create a micro-site that showcased the upcoming expansion pack. Development closely collaborated with the design team to streamline the process and reduce changes during the development phase. Despite some game data, the site was primarily informative and relatively straightforward.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game expansion microsite',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Lineage 2 Tauti site screen 1',
			},
			{
				alt: 'Lineage 2 Tauti site screen 2',
			},
		],
		projectStillActive: true,
		projectURL: 'https://www.lineage2.com/',
		anchorText: 'Read more about the <span>Lineage 2 - Tauti site<span>',
		projectLink: `
			<article class="page-link page-link--wide-image project-${ namespace }">
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
							alt="Lineage 2 Tauti"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Tauti</h3>
						<h2 class="page-link__title">Lineage 2</h2>
						<h4 class="page-link__subtitle"><span class="highlight">60+ million</span> <span class="text">monthly visitors</span></h4>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
