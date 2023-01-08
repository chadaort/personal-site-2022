const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'membership';

module.exports = {
	post: {
		type: 'project',
		date: '03/22/2021',
		title: 'Snopes membership',
		body: './index.md',
		summary: 'Our subscription billing system is powered by Chargebee and Auth0 serves as our authentication and authorization system. Additionally, we implemented single sign-on (SSO) to allow users to log in to the site, as well external system with one set of credentials.',
		tags: [ 'membership' ],
	},
	meta: {
		subtitle: 'Single Sign-On',
		homePageList: true,
		projectPosition: 'lead developer',
		imageNamespace: namespace,
		featureImage: {
			alt: 'Snopes membership banner',
		},
		hasSidebar: true,
		projectStillActive: true,
		disableImageTreatments: true,
		projectURL: 'https://www.snopes.com/',
		anchorText: 'Read more about the <span>Snopes Membership work<span>',
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
							alt="Snopes membership"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Snopes</h3>
						<h2 class="page-link__title">Membership</h2>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
