const path = require( 'path' );
const aws = require( '@pulumi/aws' );
const pulumi = require( '@pulumi/pulumi' );
const mime = require( 'mime' );
const matchPattern = require( '../../../inc/helpers/match-pattern.js' );

/**
 * Copies local files to S3 with a relative path.
 *
 * @param {string} folderPath Local file path
 * @param {aws.s3.Bucket} bucket S3 bucket
 */
module.exports = async ( folderPath, bucket ) => {
	const fileMatches = await matchPattern( `${ folderPath }**/*.*` );
	fileMatches.forEach( filePathRelativeToProject => {
		const file_key = filePathRelativeToProject.substring( 0, folderPath.length ) === folderPath ? filePathRelativeToProject.slice( folderPath.length ) : filePathRelativeToProject;
		const rootFilePath = path.join( process.cwd(), filePathRelativeToProject );
		const file = new aws.s3.BucketObject( file_key, {
			key: file_key,
			acl: 'public-read',
			bucket: bucket,
			contentType: mime.getType( rootFilePath ) || undefined,
			source: new pulumi.asset.FileAsset( rootFilePath ),
		}, { parent: bucket } );
	} );
};
