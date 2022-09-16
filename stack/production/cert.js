/**
 * Creates the SSL certificate for the project domain.
 */

const aws = require( '@pulumi/aws' );
const config = require( '../../config' );
const getZoneId = require( './helpers/get-zone-id' );

const namespace = `chadort--${ config.env }--cert`;
const zoneId = getZoneId( config.nakedDomain );

// AWS provider resource.
const eastRegion = new aws.Provider( `${ namespace }--east`, {
	profile: aws.config.profile,
	region: 'us-east-1',
} );

// AWS certificate resource.
const certificate = new aws.acm.Certificate( `${ namespace }--certificate`, {
	domainName: `*.${ config.nakedDomain }`,
	validationMethod: 'DNS',
	subjectAlternativeNames: [ config.nakedDomain ],
}, { provider: eastRegion } );

// Route 53 record that created solely for DNS validation.
const certificateValidationDomain = new aws.route53.Record( `${ config.siteHost }-validation`, {
	name: certificate.domainValidationOptions[0].resourceRecordName,
	zoneId: zoneId,
	type: certificate.domainValidationOptions[0].resourceRecordType,
	records: [ certificate.domainValidationOptions[0].resourceRecordValue ],
	ttl: 600,
} );

/**
 * Creates the SSL certificate.
 * This validation process waits on ACM to complete validation using the DNS record and for the certificate to have an "ISSUED" status.
 *
 * @returns {aws.acm.CertificateValidation} Certificate validation resource
 */
module.exports = () => new aws.acm.CertificateValidation( `${ namespace }--certificateValidation`, {
	certificateArn: certificate.arn,
	validationRecordFqdns: [ certificateValidationDomain.fqdn ],
}, { provider: eastRegion } );
