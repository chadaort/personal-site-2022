const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'lineage2-goddess-of-destruction';

module.exports = {
	post: {
		type: 'project',
		date: '05/29/2013',
		title: 'Lineage 2 Goddess of Destruction',
		body: './index.md',
		summary: 'Goddess of Destruction was an expansion pack for Lineage 2. Not all expansion packs got a microsite, but this one did because it was a huge update. The development team added 30 new hunting grounds, 60 new raid bosses, and more than 400 new equipment items, making this the most significant content update in the game\'s seven-year history.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Expansion microsite',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Lineage 2 Goddess of Destruction screen',
			},
		],
		projectStillActive: true,
		projectURL: 'https://www.lineage2.com/',
		anchorText: 'Read more about the <span>Lineage 2 - Goddess of Destruction launch<span>',
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
							alt="Linage 2 Goddess of Destruction"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>


					<div class="page-link__copy">
						<h2 class="page-link__title">Lineage 2</h2>
						<h3 class="page-link__title-type">Goddess of Destruction</h3>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
