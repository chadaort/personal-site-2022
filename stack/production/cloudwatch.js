/**
 * Builds a custom CloudWatch dashboard to monitor API Gateway metrics.
 */

const awsx = require( '@pulumi/awsx' );

/**
 * Creates a custom CloudWatch dashboard.
 *
 * @param {awsx.apigateway.API} apiGateway API Gateway resource
 */
module.exports = ( apiGateway ) => {

	const apiGatewayDurationMetric = awsx.lambda.metrics.duration( { function: apiGateway.getFunction( '/stage/api/msg/send-email' ) } );
	const apiGatewayDurationMetricAlarm = apiGatewayDurationMetric.withUnit( 'Seconds' ).withPeriod( 300 ).createAlarm( 'TooLong', {
		threshold: 5,
		evaluationPeriods: 3,
	} );

	const dashboard = new awsx.cloudwatch.Dashboard( 'chadort.com Dashboard', {
		widgets: [
			new awsx.cloudwatch.LineGraphMetricWidget( {
				width: 12,
				title: 'Receiving duration',
				metrics: [ apiGatewayDurationMetric.with( {
					extendedStatistic: 99,
					label: 'Duration p99',
				} ) ],
				annotations: new awsx.cloudwatch.HorizontalAnnotation( apiGatewayDurationMetricAlarm ),
			} ),
		],
	} );
};
