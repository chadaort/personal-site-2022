const config = require( '../../../config' );
const pageHandler = require( '../../../inc/page' );

const namespace = 'lineage2-redesign';

module.exports = {
	post: {
		type: 'project',
		date: '03/28/2011',
		title: 'Lineage 2 redesign',
		body: './index.md',
		summary: 'As part of this project, we migrated a considerably large static site to a CMS and completely redesigned it. Since Lineage 2 was released in 2003, the website was due for a rework. Over time, the site had become a complete mess; 70%+ of all pages had detached from the Dreamweaver templates. In addition, a large content site built in Dreamweaver is a terrible idea, making it difficult to parse the content from all the markup and Dreamweaver code.',
		tags: [ 'website' ],
	},
	meta: {
		subtitle: 'Game site',
		imageNamespace: namespace,
		featureImageSet: [
			{
				alt: 'Lineage 2 redesign screen 1',
			},
			{
				alt: 'Lineage 2 redesign screen 2',
			},
			{
				alt: 'Lineage 2 redesign screen 3',
			},
			{
				alt: 'Lineage 2 redesign screen 4',
			},
		],
		projectStillActive: true,
		highlight: '2018 Gamer\'s Choice Award',
		projectURL: 'https://www.lineage2.com/',
		anchorText: 'Read more about the <span>Lineage 2 redesign<span>',
		projectLink: `
			<article class="page-link page-link--mockup-image project-${ namespace }">
				<a class="page-link__a" href="${ config.siteUrl }/projects/${ namespace }/">

					<span class="page-link__bg-image-wrapper">
						<img
							class="page-link__bg-image"
							src="/assets/images/project/${ namespace }/${ namespace }--bg-image.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
							data-src="/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=1200"
							data-srcset="/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=480 480w,
								/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=700 700w,
								/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=900 900w,
								/assets/images/project/${ namespace }/${ namespace }--bg-image.png?size=1200 1200w"
							alt="Lineage 2 redesign"
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
							alt="Lineage 2 redesign mockup" />
					</div>


					<div class="page-link__copy">
						<h3 class="page-link__title-type">Site Redesign</h3>
						<h2 class="page-link__title">Lineage 2</h2>
					</div>
				</a>

			</article>
		`,
	},
	filters: {
		sidebarData: ( data, siteMap ) => pageHandler.getPostsByType( 'project', siteMap, 2, 'random' ),
	},
};
