ChadOrt.com
=======

Development repo for chadort.com.

This project deploys a static site to S3 and uses Cloudfront with an Edge function for routing and making it publicly accessible. 

Content for the site 
The static page files are built using Webpack and EJS templates and written out to /dist/. Routes are determined by matching files in the content folder against *.index.js. The *.index.js file is used to define page and meta data for the route and the main body content is stored relative in index.md.

Static site assets are also built using Webpack. Both [SaaS](https://www.npmjs.com/package/@humanmade/stylelint-config) and [JS](https://www.npmjs.com/package/@humanmade/eslint-config) files are required to follow style guidelines and pass all automated tests.

Al project infrastructure is defined in this coebase with Javascript using Pulumi packages that are built on top of Terraform. The entire production build is static that is deployed to S3 and uses Cloudfront to make the site publicly accessible. Project API endpoints are created with Lambda functions and publicly exposed as api.chadort.com.

# Development Process
The development process mostly follows the [Git Flow](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/) model. Development happens in feature branches, which are merged into `development`, which is merged into `main` for deployment onto production.

## Branch Setup
* `development` - Deploys to the development site at [www.chadortlabs.com](https:://www.chadortlabs.com). Used to test features and functionality from a technical point of view and get sign-off.
* `main` - Deploys to the production site at [www.chadort.com](https://www.chadort.com). This branch must always be assumed to be live on production.
* `hotfix-{change-name}` - Hotfixes can be committed to the `development` branch and should be prepended with `hotfix-`
* `{feature-branch}` - Any other branch is a feature and should be committed to the `development` branch

## Prerequisites
* Install Node v14 (I recommend installing Node using [nvm](https://github.com/nvm-sh/nvm) to make it easier to select your desired Node version)
* Install Yarn `npm install --global yarn`
* Install [Pulumi](https://www.pulumi.com/docs/get-started/install/) v3 and from the terminal run `pulumi login`.
* Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [set up your access keys](https://www.pulumi.com/docs/get-started/aws/begin/) from the terminal using `aws configure`.

## Local Development
The local development closely mirrors production except that I'm using Express rather than building out static pages between changes and of course, I'm using HMR so that you don't have to refresh the browser between changes. 

* Install Node packages `yarn install`
* JS and CSS `yarn site:local`;
* Server `yarn stack:local`;

## Deployments
This project can be deployed to any AWS project and the only prerequisite is that you have a domain registered in Route53. All other infrastructure and configuration is defined in code within this codebase.

The deployment commands will validate code styles, run automated tests, and release the build on AWS.
* Deploy to staging `yarn deploy:staging`
* Deploy to production `yarn deploy:prod`

# Site Designs
The site was designed in Sketch and pages assets were mostly created in Photoshop. 
