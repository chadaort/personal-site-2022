const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'ncsoft-events';

module.exports = {
	post: {
		type: 'project',
		date: '05/05/2010',
		title: 'NCSOFT events',
		body: './index.md',
		summary: 'In its role as a publisher, NCSOFT managed many events every year. We created a dedicated event site on a subdomain of ncsoft.com so that the event team could promote upcoming events and maintain an archive of all past events. Additionally, our sponsors wanted prime real estate that the company couldn\'t offer on the main property.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Public speaking events',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'NCSOFT events screen 1',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about the <span>NCSOFT events project<span>',
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
							alt="NCSOFT events"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>

					<div class="page-link__copy">
						<h2 class="page-link__title">NCSOFT</h2>
						<h3 class="page-link__title-type">Events</h3>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
