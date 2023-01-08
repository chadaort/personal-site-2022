const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'ncsoft-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '04/20/2009',
		title: 'NCSOFT redesign',
		body: './index.md',
		summary: 'It was my first project at NCSOFT, and they brought me onto it midway through. Having worked with some of the developers previously, I fit right in. A few areas of the design were still in progress, but they had already completed most of the front-end styles. In addition, I was responsible for developing the site\'s interactivity and content management system.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Publisher site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'NCSOFT redesign screen 1',
			},
			{
				alt: 'NCSOFT redesign screen 2',
			},
		],
		projectStillActive: true,
		highlight: '10+ million monthly visitors',
		projectURL: 'https://us.ncsoft.com/en-us',
		anchorText: 'Read more about the <span>NCSOFT redesign<span>',
		projectLink: `
			<article class="page-link page-link--mockup-image project-${ namespace } project-align-right">
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
							alt="NCSOFT redesign"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</span>

					<div class="page-link__image-wrapper">
						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=1200"
							data-src="/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--mockup.png?size=1200 1200w"
							alt="NCSOFT redesign mockup" />
					</div>

					<div class="page-link__copy">
						<h3 class="page-link__title-type">Site redesign</h3>
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
