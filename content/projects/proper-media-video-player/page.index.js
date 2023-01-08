const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'ad-tech-video-player';

module.exports = {
	post: {
		type: 'project',
		date: '03/15/2016',
		title: 'Video player',
		body: './index.md',
		summary: 'The video advertising industry has been growing at a rapid pace for years. Proper Media wanted to create a video advertising platform for publishers. The platform allows publishers to upload videos or images to create slideshows so that ads can be injected during playback.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Ad tech',
		imageNamespace: namespace,
		featureImage: {
			alt: 'Video player banner',
		},
		projectStillActive: true,
		highlight: '30+ million monthly views',
		projectURL: 'https://propermedia.io',
		anchorText: 'Read more about the <span>Proper Media video player<span>',
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
							alt="Proper Media video player"
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
							alt="Proper Media video player alternative image"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Ad Tech Player</h3>
						<h2 class="page-link__title">Proper Media</h2>
						<h4 class="page-link__sub-title"><span>30+ million</span> monthly views</h4>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
