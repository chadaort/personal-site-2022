/**
 * Production stack startup file for Pulumi.
 */

const buildApiGateway = require( './api-gateway' );
const buckets = require( './buckets' );
const buildCertificate = require( './cert' );
const buildDistribution = require( './distribution' );
const buildDns = require( './dns' );
const copyFolderToS3 = require( './helpers/copy-folder-to-s3' );

const certificate = buildCertificate();
copyFolderToS3( 'dist/', buckets.content );
const apiGateway = buildApiGateway();
const distribution = buildDistribution( buckets.content, apiGateway, certificate );
buildDns( distribution );

module.exports = {
	content_bucket_endpoint: buckets.content.websiteEndpoint,
	distribution_domain: distribution.domainName,
	apigateway_url: apiGateway.url,
};
