const aws = require( '@pulumi/aws' );

/**
 * Retrieves the hosted zone ID using the domain name.
 *
 * @param {string} domain Domain name containing the zone
 * @returns Route53 hosted zone ID
 */
module.exports = async ( domain ) => aws.route53.getZone(
	{ name: domain },
	{ async: true }
).then( zone => zone.zoneId );
