At Snopes, we rely on several external systems and use a data warehouse to centralize reporting data for business intelligence. The biggest challenge on the reporting side is that we maintain our accounts with direct bidders on our ad system, and some of these companies have an archaic way of delivering reports, like over email. 

> Our solution was to build infrastructure around SNS to decouple the event stream from jobs that process them.

<figure class="image-figure image-style-b align-right">
	<img
		src="/assets/images/project/central-dispatch/central-dispatch--infrastructure.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
		data-src="/assets/images/project/central-dispatch/central-dispatch--infrastructure.png?size=972" 
		alt="Snopes infrastructure"
		data-lazy-load>
	<figcaption>Infrastructure diagram</figcaption>
</figure>

Our solution was to build infrastructure around [SNS](https://aws.amazon.com/sns/) to decouple the event stream from jobs that process them. This diagram roughly illustrates the request flow and the infrastructure supporting the project.

All production and lower-environment infrastructure were defined in code using [Pulumi](https://www.pulumi.com/) and written in Javascript. That allowed the entire project to be version-controlled and simplified release management. Unfortunately, I can't share the project code, but here is an example showing how to provision an API Gateway in AWS.


<h3 class="code-block-notation">Provision an API Gateway in AWS using Pulumi</h3>

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
