/**
 * Creates a Lambda@Edge that is used to rewrite the request route.
 */

const aws = require( '@pulumi/aws' );
const config = require( '../../config' );

const namespace = `chadort--${ config.env }--request-lambda`;

// Lambda role resource.
const role = new aws.iam.Role( `${ namespace }--role`, {
	assumeRolePolicy: {
		Version: '2012-10-17',
		Statement: [ {
			Action: 'sts:AssumeRole',
			Principal: {
				Service: [
					'lambda.amazonaws.com',
					'edgelambda.amazonaws.com',
				],
			},
			Effect: 'Allow',
			Sid: '',
		} ],
	},
} );

// Lambda policy resource for logging.
const policy = new aws.iam.Policy( `${ namespace }--policy`, {
	path: '/',
	description: 'IAM policy for logging from a lambda',
	policy: {
		Version: '2012-10-17',
		Statement: [ {
			Action: [
				'logs:CreateLogGroup',
				'logs:CreateLogStream',
				'logs:PutLogEvents',
			],
			Resource: 'arn:aws:logs:*:*:*',
			Effect: 'Allow',
		} ],
	},
} );

// RolePolicyAttachment using the role and policy resource.
const rolePolicyAttachment = new aws.iam.RolePolicyAttachment( `${ namespace }--role-policy-attachment`, {
	role: role.name.apply( ( name ) => name ),
	policyArn: policy.arn,
} );

/**
 * Cloudfront Lambda@Edge for rewriting request routes.
 *
 * @returns {aws.lambda.CallbackFunction} Lambda function
 */
module.exports = () => new aws.lambda.CallbackFunction( namespace, {
	memorySize: 128,
	description: 'Maybe modify the request before hittng Cloudront',
	// Enables versioning which is needed for Edge functions.
	publish: true,
	// Edge functions must be less than 5 seconds.
	timeout: 4,
	callback: async ( event ) => {
		const { cf } = event.Records[0];
		const { request } = cf;

		if ( request.uri.endsWith( 'index.html' ) ) {
			return {
				status: '301',
				statusDescription: 'Moved',
				headers: {
					location: [ {
						key: 'Location',
						value: request.uri.substring( 0, request.uri.length - 'index.html'.length ),
					} ],
				},
			};
		}

		// Remove and redirect any request to *.html
		if ( request.uri.endsWith( '.html' ) ) {
			return {
				status: '301',
				statusDescription: 'Moved',
				headers: {
					location: [ {
						key: 'Location',
						value: request.uri.substring( 0, request.uri.length - '.html'.length ),
					} ],
				},
			};
		}

		// Rewrite any request to */ to */index.html
		if ( request.uri.endsWith( '/' ) ) {
			return {
				...request,
				uri: `${ request.uri }index.html`,
			};
		}

		// Rewrite any request that doesn't end with a file extension as *.html
		if ( ! request.uri.substring( request.uri.length - 5 ).includes( '.' ) ) {
			return {
				...request,
				uri: `${ request.uri }.html`,
			};
		}

		return request;
	},
	role,
} );
