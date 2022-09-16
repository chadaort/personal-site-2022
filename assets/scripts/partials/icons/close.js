/**
 * Close icon SVG markup.
 *
 * @param {boolean} icon Should we return the <i> or just SVG markup.
 * @param {null|string} iconSize String representation of the icon size
 * @returns {string} Markup
 */
export default ( icon = false, iconSize = null ) => {

	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
			<path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"/>
		</svg>
	`;

	if ( icon ) {
		return `<i class="icon__close${ iconSize ? ` icon--${ iconSize }` : '' }">${ svg }</i>`;
	}

	return svg;
};
