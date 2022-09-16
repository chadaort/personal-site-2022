/**
 * Creates the API Gateway that serves as the project API.
 */

const awsx = require( '@pulumi/awsx' );
const config = require( '../../config' );

const namespace = `chadort--${ config.env }--api`;

// List of a API endpoints.
const endpoints = [
	{
		path: 'msg/send-email',
		method: 'GET',
		eventHandler: async ( event, context ) => {
			return {
				statusCode: 200,
				headers: {
				  'Content-Type': 'text/html',
				},
				body: 'body message',
			};
		},
	},
];

/**
 * Creates an API Gateway used by the project API.
 *
 * @returns {awsx.apigateway.API} API Gateway resource
 */
module.exports = () => new awsx.apigateway.API( namespace, {
	stageName: config.apiVersion,
	restApiArgs: { binaryMediaTypes: [] },
	routes: endpoints.map( ( { path, method, eventHandler } ) => ( {
		path,
		method,
		eventHandler,
	} ) ),
} );
