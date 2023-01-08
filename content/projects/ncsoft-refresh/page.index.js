const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'ncsoft-refresh';

module.exports = {
	post: {
		type: 'project',
		date: '11/21/2011',
		title: 'NCSOFT refresh',
		body: './index.md',
		summary: 'Corporate site changes, particularly redesigns, can have a challenging approval process, and this project was no exception. About a dozen stakeholders participated in the process in various capacities. While everyone agreed that our corporate website should focus on the studios instead of the publisher, getting all the studios to agree on a shared design proved challenging.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Publisher site',
		homePageList: true,
		projectPosition: 'lead developer',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'NCSOFT refresh screen 1',
			},
			{
				alt: 'NCSOFT refresh screen 2',
			},
		],
		projectStillActive: true,
		projectURL: 'https://us.ncsoft.com/en-us',
		anchorText: 'Read more about the <span>NCSOFT site redesign<span>',
		projectLink: `
			<article class="page-link page-link--oval-image page-link--oval-image-lg project-${ namespace }">
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
							alt="NCSOFT refresh"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</span>

					<div class="page-link__image-wrapper">
						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--1x1.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200 1200w"
							alt="NCSOFT refresh alternative image"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>

					<div class="page-link__copy">
						<h2 class="page-link__title">NCSOFT</h2>
						<h3 class="page-link__title-type">Site Redesign</h3>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
