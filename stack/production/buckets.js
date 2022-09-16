/**
 * Creates the S3 buckets used in the project.
 */

const aws = require( '@pulumi/aws' );
const config = require( '../../config' );

const namespace = `chadort--${ config.env }--bucket`;

// Site content bucket.
const contentBucket = new aws.s3.Bucket(
	`${ namespace }--content`,
	{
		bucket: config.siteHost,
		acl: 'public-read',
		website: {
			indexDocument: 'index.html',
			errorDocument: '404.html',
		},
	}
);

module.exports = {
	content: contentBucket,
};
