const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'ncsoft-newsletters';

module.exports = {
	post: {
		type: 'project',
		date: '03/01/2010',
		title: 'NCSOFT newsletters',
		body: './index.md',
		summary: 'As the publisher, NCSOFT managed all the newsletters for any current and upcoming games. Some games had multiple newsletters with varying frequencies and had a reasonably heavy design. Newsletter development at that time was messy. Outlook used Word to render their emails, and Yahoo had its quirks.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: '6-8 propties, once a week',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'NCSOFT newsletters screen 1',
			},
			{
				alt: 'NCSOFT newsletters screen 2',
			},
		],
		projectStillActive: false,
		anchorText: 'Read more about <span>NCSOFT newsletter work<span>',
		projectLink: `
			<article class="page-link page-link--oval-image page-link--oval-image-lg project-${ namespace }">
				<a class="page-link__a" href="${ config.siteUrl }/projects/${ namespace }/">

					<span class="page-link__bg-image-wrapper">
						<img
							class="page-link__bg-image"
							src="/assets/images/project/${ namespace }/${ namespace }--16x9.jpg?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--16x9.jpg?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--16x9.jpg?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.jpg?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.jpg?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--16x9.jpg?size=1200 1200w"
							alt="NCSOFT newsletters"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</span>

					<div class="page-link__image-wrapper">

						<span class="page-link__icon-wrapper">
							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 368.625 368.625" xml:space="preserve" class="page-link__icon">
								<path d="M356.125,50.318H12.5c-6.903,0-12.5,5.597-12.5,12.5v242.988c0,6.902,5.597,12.5,12.5,12.5h343.625
										c6.902,0,12.5-5.598,12.5-12.5V62.818C368.625,55.916,363.027,50.318,356.125,50.318z M343.625,293.307H25V75.318h318.625V293.307
										z"/>
								<path d="M57.755,134.201l120,73.937c2.01,1.239,4.283,1.858,6.557,1.858s4.547-0.619,6.557-1.858l120-73.937
										c5.877-3.621,7.707-11.322,4.086-17.199s-11.324-7.707-17.199-4.085l-113.444,69.896L70.869,112.917
										c-5.875-3.619-13.576-1.793-17.199,4.085C50.048,122.878,51.877,130.58,57.755,134.201z"/>
							</svg>
						</span>

						<img
							class="page-link__image"
							src="/assets/images/project/${ namespace }/${ namespace }--1x1.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--1x1.png?size=1200 1200w"
							alt="NCSOFT newsletters alternative image"
							data-lazy-load-target=".page-link"
							data-lazy-load />
					</div>


					<div class="page-link__copy">
						<span>
							<h2 class="page-link__title">NCSOFT</h2>
							<h3 class="page-link__title-type">Newsletters</h3>
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
