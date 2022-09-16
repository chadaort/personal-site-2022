import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-javadoclike';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-phpdoc';
import 'prismjs/components/prism-php-extras';
import 'prismjs/components/prism-scss';

/**
 * Syntax highlighting for inline code and code blocks.
 *
 * @returns {undefined} Void
 */
export default () => {
	Prism.highlightAll();
};
