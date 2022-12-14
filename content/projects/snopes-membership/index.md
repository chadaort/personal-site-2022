The spread of misinformation is a serious problem that needs to be addressed. [Fake news](https://en.wikipedia.org/wiki/Fake_news) can have real-world consequences, such as inciting violence or causing people to lose faith in democracy. By [fact-checking](https://en.wikipedia.org/wiki/Fact-checking) false stories and holding those who spread them accountable, Snopes is helping to fight this problem. However, this work is expensive and time-consuming, so Snopes is now offering membership access to help fund these efforts.

Our subscription billing system is powered by [Chargebee](https://www.chargebee.com/), and [Auth0](https://auth0.com/) serves as our authentication and authorization system. Additionally, we implemented [single sign-on](https://auth0.com/docs/authenticate/single-sign-on) (SSO) to allow users to log in to the site as well external system with one set of credentials. Here is a diagram showing roughly how that looked:

## Authentication and authorization

<figure class="image-figure align-right image-style-b">
	<img
		src="/assets/images/project/membership/membership--diagram-1.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
		data-src="/assets/images/project/membership/membership--diagram-1.png?size=972" 
		alt="Membership flow"
		data-lazy-load>
	<figcaption>Membership flow</figcaption>
</figure>

When it comes to authentication and authorization, you want a secure, easy-to-use, and scalable solution. We considered Okta because we had previously integrated it for staff, but Auth0 is very developer friendly and geared towards applications. In addition, it’s a fantastic solution and free for up to 7k active users. Auth0 created a diagram that outlines the flow pretty well:

You can configure a lot in Auth0, but the basic setup is pretty straightforward. We created a tenant for production and one for each of the lower environments. We managed these tenants and the configuration using [Pulumi](https://www.pulumi.com/) which uses the [Auth0 Terraform provider](https://registry.terraform.io/providers/auth0/auth0/latest/docs). If you’re a programmer and haven’t used Pulumi yet, you should give it a try. In the end, this provided us a way to manage our Auth0 tenants in code and to release changes using [GitHub actions](https://github.com/features/actions).

<figure class="image-figure align-left image-border">
	<img
		src="/assets/images/project/membership/membership--diagram-2.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
		data-src="/assets/images/project/membership/membership--diagram-2.png?size=972" 
		alt="Auth0 flow diagram"
		data-lazy-load>
	<figcaption>Auth0 flow diagram</figcaption>
</figure>

Auth0 provides auth components for all the primary use cases and is entirely customizable. They have a new [Universal login](https://auth0.com/docs/customize/universal-login-pages/universal-login-page-templates) that looks exciting, but I implemented [v9 using the SDK](https://auth0.com/docs/libraries/auth0js). The difference between the classic version and v9 with the SDK was that the latter was fully customizable. I was responsible for building out the components in their entirety and using the SDK to process the form submissions.

Its most remarkable feature is its extensible authorization flow. For example, [Actions](https://auth0.com/docs/customize/actions) allow you to customize the authentication flow. At the same time [Hooks](https://auth0.com/docs/customize/hooks) lets you customize the Auth0 behavior for specific extensibility points, such as pre-and post-registration, password changes, and phone messages.


## Membership subscriptions

At the time, there were not as many subscription options as there are now. Even [Shopify is getting into subscriptions](https://help.shopify.com/en/manual/products/purchase-options/subscriptions) rather than relying on 3rd party apps. We chose Chargebee because it was built around subscriptions and supported our needs, including support for PayPal.

I was responsible for integrating products in WordPress and the checkout flows. We didn’t manage products from WordPress, but we did use the API to fetch available products so that the product team could select products at the page level. 

The checkout flow is a bit more complicated, but I used the client library to fetch the product displays using the configuration passed from the user in a global window object. Chargebee provides customizable views with their client library, and then on submit, a callback handler will tokenize the response that gets passed to the server to complete the checkout process.
