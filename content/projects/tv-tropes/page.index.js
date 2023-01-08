const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'tv-tropes';

module.exports = {
	post: {
		type: 'project',
		date: '10/23/2015',
		title: 'TV Tropes',
		body: './index.md',
		summary: 'A wiki and forum redesign for TV Tropes was one of the projects I worked on at Proper Media. If you\'re one of those who notice patterns across the medium or want to understand the bits of storytelling better, TV Tropes is an excellent resource.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Site redesign',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'TV Tropes screen 1',
			},
			{
				alt: 'TV Tropes screen 2',
			},
			{
				alt: 'TV Tropes screen 3',
			},
		],
		projectStillActive: true,
		projectURL: 'https://tvtropes.org/',
		highlight: '20+ million monthly visitors',
		anchorText: 'Read more about the <span>TV Tropes redesign<span>',
		projectLink: `
			<article class="page-link page-link--oval-image project-${ namespace }">
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
							alt="TV Tropes redesign"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</span>

					<div class="page-link__image-wrapper">
						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200"
							data-src="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200 1200w"
							alt="TV Tropes redesign alternative image" />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Redesign</h3>
						<h2 class="page-link__title">TV Tropes</h2>
						<h4 class="page-link__sub-title"><span>20+ million</span> monthly visitors</h4>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
