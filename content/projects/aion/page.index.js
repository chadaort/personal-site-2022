const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'aion-launch';

module.exports = {
	post: {
		type: 'project',
		date: '09/22/2009',
		title: 'Aion',
		body: './index.md',
		summary: 'This massive project is probably still the most significant project that I\'ve worked on. We deployed an entirely new CMS Alfresco with customized content workflows and launched a new site but we were also dealing with a lot of work from the industry shift towards free-to-play.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game launch site',
		homePageList: true,
		projectPosition: 'lead developer',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Aion screen 1',
			},
			{
				alt: 'Aion screen 2',
			},
			{
				alt: 'Aion screen 3',
			},
		],
		hasSidebar: true,
		projectStillActive: true,
		projectURL: 'https://www.aiononline.com/',
		highlight: '20+ million <span>monthly visitors</span>',
		anchorText: 'Read more about the <span>Aion project<span>',
		projectLink: `
			<article class="page-link page-link--wide-image project-${ namespace } project-align-right">
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
							alt="Aion launch site"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>

					<div class="page-link__copy">
						<span>
							<h3 class="page-link__title-type">Launch Site</h3>
							<h2 class="page-link__title">Aion Online</h2>
							<h4 class="page-link__sub-title"><span>60+ million</span> <span>monthly visitors</span></h4>
						</span>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
