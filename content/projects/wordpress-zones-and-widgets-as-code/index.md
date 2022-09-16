The product team needed granular control over secondary content placements on the site. Widgets can be managed from the admin panel, but the user interface doesn't work well when there are lots of variations across post types. Although there are plugins like [Custom Sidebars](https://wordpress.org/plugins/custom-sidebars/), they all failed to meet our business and code quality requirements. Plugins for WordPress often lack proper sanitization or escaping, but it's the world we live in. During internal discussions, it was determined that business didn't need admin control over these placements, so they could be configured in code. Due to the sheer number of variations, we couldn't bake these into templates. As a result, we had to build a GUI-less widget system that met these requirements.

- The ability to assign widgets to only display in specific contexts.
    - Home page
    - Post types
    - Archive pages
    - Author pages
    - Search
    - On select posts or pages
- Able to manage a lot of variations in a sane way, either via the admin panel or with configuration in code.

WordPress has a system where you create sidebars that you can add widgets to but with the default user interface, managing a ton of sidebars in the panel admin would be messy. I created a relatively simple registration system that allowed widgets to be managed with configuration. It was broken down into three major parts.

- Zone - A zone is placements on the page like the sidebar or post-footer. A page can have an unlimited amount of zones.
- A group - Is a wrapper of multiple widgets that can be assigned to a zone. Multiple groups can be assigned to a zone.
- Widget - Some code block. This could be a simple message, post list, or newsletter signup. You can assign an unlimited amount of widgets to a group.

Here is an example of zone placement on a page.

![](/assets/images/content/wordpress-zones-and-widgets-as-code/diagram-1.png)

This is how a zone, group, widget relationship is structured.

![](/assets/images/content/wordpress-zones-and-widgets-as-code/diagram-2.png)

Now that we know what kind of structure we need, let's look at the code. After registering a zone placement, you can place it using a template function.

```php
// Register zone.
Zones\register_zone( 'sidebar' );

// Place the zone within a template.
Zones\get_zone_template( 'sidebar' );
```

It's now time to register a widget or a block of code and pass some data to the template, accessible via `$data`, as per WordPress standard. As I will show below, widget data can also be added in the context of a group. 

```php
// Register newsletter sign up widget.
Zones\register_zone_widget( 'partials/newsletter-signup' );

// Register latest list widget.
Zones\register_zone_widget( 'partials/latest_list', [
	'cache_exp' => 86400,
] );

```

Finally, we'll need to register a group, assign it to a zone, and add any widgets that should be attached. In the example above, the two widgets we registered early are attached to this group, which is attached to a zone. Additionally, you may have noticed that the group definition includes priority and filters. The priority works the same way that WordPress' filters do, and I created a half dozen filters to control what pages, post types, and so on, the group would display.

Providing granular control over secondary content placement without moving it to the client met the business goals.
