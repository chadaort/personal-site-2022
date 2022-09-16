/**
 * Builds the lightbox markup.
 *
 * @param {null|string} src Either null or the src path of an image.
 * @returns {string} Lightbox markup
 */
export default ( src = null ) => `
	<div id="lightbox" class="lightbox${ src ? ' lightbox--active' : '' }" data-index>
		<div class="lightbox__wrapper">
			<div class="lightbox__img-wrapper">
				<img class="lightbox__img" src="${ src ?? '' }" />
				<a id="lightbox-close" class="lightbox__control-close lighbox-control" href="#">x</a>
				<a id="lightbox-move-left" class="lightbox__control-left lighbox-control" href="#"></a>
				<a id="lightbox-move-right" class="lightbox__control-right lighbox-control" href="#"></a>
			</div>
		</div>
	</div>
`;
