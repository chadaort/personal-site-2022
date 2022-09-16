/**
 * Creates DNS records for the project.
 */

const aws = require( '@pulumi/aws' );
const config = require( '../../config' );
const getZoneId = require( './helpers/get-zone-id' );

const namespace = `chadort--${ config.env }--dns`;
const zoneId = getZoneId( config.nakedDomain );

// Log Group for Route53 logging.
const logGroup = new aws.cloudwatch.LogGroup(
	`${ namespace }--log-group`,
	{ retentionInDays: 30 },
	{ provider: aws[ 'us-east-1' ] }
);

// Policy resource for CloudWatch logging.
const policyDocument = aws.iam.getPolicyDocument( {
	statements: [ {
		actions: [
			'logs:CreateLogStream',
			'logs:PutLogEvents',
		],
		resources: [ 'arn:aws:logs:*' ],
		principals: [ {
			identifiers: [ 'route53.amazonaws.com' ],
			type: 'Service',
		} ],
	} ],
} );

// LogResourcePolicy for the Rout53 resource.
const policy = new aws.cloudwatch.LogResourcePolicy( `${ namespace }--log-policy`, {
	policyDocument: policyDocument.then( document => document.json ),
	policyName: `${ namespace }--log-policy`,
}, { provider: aws[ 'us-east-1' ] } );

/*
module.exports = () => new aws.route53.QueryLog(
	`${ namespace }--query-log`,
	{
		cloudwatchLogGroupArn: logGroup.arn,
		zoneId: aws.route53.getZone(
			{ name: config.nakedDomain },
			{ async: true }
		).then( zone => zone.zoneId ),
	},
	{ dependsOn: [ policy ] }
);
*/

/**
 * Creates the Route53 records.
 *
 * @param {aws.cloudfront.Distribution} distribution Cloudfront distrobution
 */
module.exports = distribution => {

	const apexDomain = new aws.route53.Record( `${ namespace }--Arecord-apex`, {
		name: '',
		zoneId: zoneId,
		type: 'A',
		aliases: [ {
			name: distribution.domainName,
			zoneId: distribution.hostedZoneId,
			evaluateTargetHealth: true,
		} ],
	} );

	const wwwDomain = new aws.route53.Record( `${ namespace }--Arecord-www`, {
		name: 'www',
		zoneId: zoneId,
		type: 'A',
		aliases: [ {
			name: distribution.domainName,
			zoneId: distribution.hostedZoneId,
			evaluateTargetHealth: true,
		} ],
	} );

	const apiDomain = new aws.route53.Record( `${ namespace }--Arecord-api`, {
		name: 'api',
		zoneId: zoneId,
		type: 'A',
		aliases: [ {
			name: distribution.domainName,
			zoneId: distribution.hostedZoneId,
			evaluateTargetHealth: true,
		} ],
	} );
};
