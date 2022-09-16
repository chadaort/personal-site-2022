At Snopes, we rely on several external systems and we also use a data warehouse to centralize reporting data for business intelligence. The biggest challenge on the reporting side is that we maintain our own accounts with direct bidders on our ad system and some of these companies have an archaic way of delivering reports, like over email. 

Our solution was to build infrastructure around [SNS](https://aws.amazon.com/sns/) to decouple the event stream from jobs that process them. This diagram roughly illustrates the request flow and the infrastructure supporting the project.

<img class="img--no-pad" src="/assets/images/content/central-dispatch/infrastructure.png" alt="Snopes infrastructure">

All production and lower-environment infrastructure were defined in code using [Pulumi](https://www.pulumi.com/) and written in Javascript. That allowed the entire project to be version-controlled and simplified release management. I can't share project code but here is an example showing how to provision an API Gateway in AWS.


```javascript
// Callback handler for requests to the root path.
const gatewayCallback = new aws.lambda.CallbackFunction( 'calback-handler-name', {
    memorySize: 128,
	description: 'Process requests for the root path',
    callback: async ( event, ctx ) => {

        // Just an example response.
        return {
            statusCode: 200,
            body: 'Hello, world.',
        };
    },
} );

// Provisions the API Gateway and create endpoints.
const api = new apigateway.RestAPI( 'api-gateway-name', {

    routes: [
        {
            path: '/',
            method: 'GET',
            eventHandler: gatewayCallback,
        },
    ],
} );

// After you have Pulumi configured, you'll run `pulumi up` in your terminal to provision the resources in AWS.
```

The result was a way to consume event data from external systems and process it to keep all systems up to date.
