const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'element-gallery';

module.exports = {
	post: {
		type: 'project',
		date: '10/10/2008',
		title: 'Element gallery',
		body: './index.md',
		summary: 'I found this fun design in my archive and thought I\'d share it. With a chalkboard-like background, email signup, and a progress bar, I created a lovely coming soon design.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'A prelaunch site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Element gallery background image',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about the <span>Element Gallery project<span>',
		projectLink: `
			<article class="page-link page-link--oval-image page-link--oval-image-lg project-${ namespace }">
				<a class="page-link__a" href="${ config.siteUrl }/projects/${ namespace }/">

					<div class="page-link__image-wrapper">
						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--1x1.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200 1200w"
							alt="Element gallery"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>

					<div class="page-link__copy">
						<h2 class="page-link__title">Element <span>Gallery</span></h2>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
