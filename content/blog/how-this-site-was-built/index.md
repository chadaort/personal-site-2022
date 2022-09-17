There are a few technologies that I have wanted to work with or extend my knowledge around, so I set out to do them on my website. To avoid maintaining a database, I chose not to use WordPress or another CMS. Using Webpack and Markdown files; I built a static site generator. It can be committed to [Github](https://github.com/chadaort/personal-site-2022) and requires little maintenance. The infrastructure is defined in Javascript and provisioned in AWS using [Pulumi](https://www.pulumi.com).

## Design
I don't do much design work professionally these days, but I still find time to work on personal projects. Since I've had this design in mind for some time, it came together pretty quickly when I started working on it. My original plan was to use Photoshop since it was so familiar to me, and not too long ago, it was the standard for website design. However, to give one of the new products a try, I used [Sketch](https://www.sketch.com/). I was incredibly impressed with how much it did that we always wish Photoshop had done. Although some things could be improved, especially around component extendibility, it's still a solid experience. In retrospect, I probably should have chosen [Figma](https://www.figma.com/).

Throughout my career, I have built and redesigned many websites. A well-thought-out design makes development more manageable, and a personal project is no different. As a result, I can stay focused when wearing several other hats. Even so, I reserve time to push the design in code. The style guide is a bit overkill for a project like this, but I created complete mobile and desktop designs to help inform the style guide.

Although I did a lot of Flash development in my early career, I have only worked with [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) a handful of times, so I wanted to work with it again. I created a full-screen background for this project that displays my career highlights in a grid. A linear gradient is overlaid and either multiplied or darkened depending on the color mode applied. I use a couple of masks on the light theme to create a grungy look, while on the dark theme, the entire grid is dark and slightly dingy. 

## Front-end development
My templates are written using [EJS](https://ejs.co/), class names are constructed using [BEM methodology](http://getbem.com/) and styles are written using [SCSS](https://sass-lang.com/). I build purpose-built frontends and modularize them around business needs. I follow most industry-standard style guidelines and keep my stylesheet as flat as possible. We ended up with a lean stylesheet built around the project's needs.

For defining type sizes, I use the Major Third type scale with a varying base size (not an HTML element) that scales based on device size and dpi. Rather than going into great detail about how modular scales work, I'll mention that text looks best when it follows a consistent pattern.

## Build tools and the static build process
Every static asset, including HTML files, is built with Webpack. I do this by pattern matching inside the content folder against `index.js` files that define a page basename. Then, I collect all the relevant page data and pass it along with the page path to Webpack so that it can create the static files for the page. Due to several problems with the publicly available EJS loaders, I wrote my own Webpack plugin. 

Local development uses a single dev server, loads in the footer, and includes JS and CSS so you will see a short flicker after the styles load in the footer. In production, the build process extracts all CSS and writes them out to a single CSS file that loads in the head, preventing this issue.   

## Infrastructure as code
I like working with Pulumi to build infrastructure because learning Terraform is difficult when I'm not working with it regularly. Also, as a programmer, I like the freedom of a programming language over something declarative.

The entire production infrastructure is defined in the repo and written in Javascript. Files and assets are stored on [S3](https://docs.aws.amazon.com/s3/index.html) and served via [Cloudfront](https://docs.aws.amazon.com/cloudfront/index.html). The Cloudfront distribution also routes API requests to an [API Gateway](https://docs.aws.amazon.com/apigateway/index.html), where I use [Lambdas](https://docs.aws.amazon.com/lambda/index.html) to process the requests. I'm only using the API to pass form submissions, but I need to do it somewhere when the site is entirely static. 

There are limitations to serving a site from S3 with Cloudfront. I cannot route multiple subdomains to the same resource with a single distribution, so I was not able to handle naked domain requests on the server. Rather than creating a second distribution to route naked domain requests, I redirect those requests to the client.

The stack changes are deployed with a package.json command, `yarn deploy:prod`, which builds out all the client assets and static site files, followed by a Pulumi command, which checks for stack differences and deploys the changes.


1. ​Runs CSS and Javascript linters to ensure the code follows style guidelines.
1. Runs automated tests.
1. Deletes any previous build files.
1. Builds minified CSS and Javascript files in the dist folder.
1. Copies images, videos, and static files to the dist folder.
1. Parses markup files to build HTML files in the dist folder.
1. Creates certificates in AWS.
1. Copies the dist folder to S3 in AWS.
1. Provision/updates an API Gateway in AWS.
1. Provision/updates the Cloudfront distribution in AWS.
1. Configures DNS records in AWS.

## Wrapping up
Overall, I'm happy with the result and was able to try out some new things.
