"use strict";
const path = require( 'path' );
Object.defineProperty(exports, "__esModule", { value: true });
const sharp = require("sharp");
class SharperAdapter {
    constructor(imagePath) {
        this.image = sharp(imagePath);
		this.imagePath = imagePath;
    }

    metadata() {
        return this.image.metadata();
    }
    async resize({ width, mime, options }) {

        return new Promise((resolve, reject) => {

			let resized;

			if ( options.solid ) {
				this.image = sharp( path.join( __dirname, '..', '/assets/images/black-bg.png' ) );
				resized = this.image.clone().resize( width, null );
			} else {
				resized = this.image.clone().resize(width, null);
			}

            if (!options.rotate) {
                // .toBuffer() strips EXIF metadata like orientation, so portrait
                // images will become landscape. This updates the image to reflect
                // the EXIF metadata (if an EXIF orientation is set; otherwise unchanged).
                resized.rotate();
            }
            if (options.background) {
                resized = resized.flatten({
                    background: options.background,
                });
            }

			if ( options.injectPlaceholder ) {
				resized = resized.blur( 20 );
			}

            if (mime === 'image/jpeg') {
                resized = resized.jpeg({
                    quality: options.quality,
                    progressive: options.progressive,
                });
            }
            if (mime === 'image/webp') {
                resized = resized.webp({
                    quality: options.injectPlaceholder ? 65 : options.quality,
                });
            }
            if (mime === 'image/avif') {
                // @ts-ignore
                resized = resized.avif({
                    quality: options.quality,
                });
            }
            // rotate
            if (options.rotate && options.rotate !== 0) {
                resized = resized.rotate(options.rotate);
            }

			/*
			if (options.blur && options.blur !== 0) {
                resized = resized.blur(options.blur);
            }
			*/
            resized.toBuffer((err, data, { height }) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({
                        data,
                        width,
                        height,
                    });
                }
            });
        });
    }
}
// export default SharpAdapter
module.exports = (imagePath) => {
    return new SharperAdapter(imagePath);
};
