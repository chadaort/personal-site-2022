Snopes publishes wire content from the [Associated Press](https://apnews.com/). It can be difficult to find articles since we don't have licenses for all articles, and from their website, it isn't clear which articles we have a license for.

There was a discussion about programmatically pushing all available articles to WordPress and letting them select which ones to publish. In a database that is already very large, this creates a lot of unused articles. We decided to create a Slack application to push all available articles to a handful of Slack channels where writers can selectively push articles to WordPress as drafts.

We created a Slack channel for each feed type that we want to monitor, and I created a [Slack application](https://api.slack.com/docs) to poll the feeds and update each channel when there is an update. An article entry in Slack displays a title, summary, thumbnail, AP link, keywords, and a button to create a draft in our CMS. A writer can review the available articles at a glance, read the AP article itself, and search for articles using Slack. 

Writers can search AP or view feeds directly in a Slack modal with paginated results using a handful of [slash commands](https://api.slack.com/interactivity/slash-commands). Additionally, I'm exposing the source data to writers via a slash command to inform them of raw data from AP, which has helped us polish the article view in Slack.

