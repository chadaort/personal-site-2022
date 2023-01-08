const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'city-of-heroes-free-to-play';

module.exports = {
	post: {
		type: 'project',
		date: '05/31/2012',
		title: 'City of Heroes',
		body: './index.md',
		summary: 'MMOs and other game genres started having challenging discussions when free-to-play came to the market to decide if they would move to a free-to-play model with micro-transactions. With City of Heroes on its last legs, it was clear it would need to convert to a free-to-play model to stay competitive. Even though it did not save COH, it was a financial improvement over the monthly subscription model.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Launches free to play',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'City of Heroes screen 1',
			},
			{
				alt: 'City of Heroes screen 2',
			},
			{
				alt: 'City of Heroes screen 3',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about <span>converting City of Heroes to free to play<span>',
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
							alt="City of Heroes free to play"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>

					<div class="page-link__copy">
						<h3 class="page-link__title-type">Free to Play</h3>
						<h2 class="page-link__title" data-title="City of Heroes">City of Heroes</h2>
					</div>

				</a>
			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
