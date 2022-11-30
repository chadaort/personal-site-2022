The product team wanted granular control over secondary content placements on the site. Widgets can be managed from the admin panel, but the user interface doesn't work well when there are many variations across post types. Although there are plugins like [Custom Sidebars](https://wordpress.org/plugins/custom-sidebars/), they all failed to meet our business and code quality requirements. Plugins for WordPress often lack proper sanitization or escaping, but it's the world we live in. During internal discussions, it was determined that the business didn't need admin control over these placements so that they could be configured in code. Due to the sheer number of variations, we couldn't bake these into templates. As a result, we had to build a GUI-less widget system that met these requirements.

- The ability to assign widgets to only display in specific contexts.
    - Home page
    - Post types
    - Archive pages
    - Author pages
    - Search
    - On select posts or pages
- Able to manage a lot of variations in a sane way, either via the admin panel or with configuration in code.

WordPress has a system where you create sidebars to which you can add widgets, but with the default user interface, managing a ton of sidebars in the panel admin would be messy. I created a relatively simple registration system that allowed widgets to be managed with configuration. It was broken down into three major parts.

- **Zone** - A zone is placed on the page like the sidebar or post-footer. A page can have an unlimited amount of zones.
- **Group** - This is a wrapper of multiple widgets that can be assigned to a zone. Various groups can be assigned to a zone.
- **Widget** - Some code block. This could be a simple message, post list, or newsletter signup. You can assign an unlimited amount of widgets to a group.

Here is an example of zone placement on a page.

<figure class="image-figure image-border--thin">
	<img
		src="/assets/images/project/wordpress-zones-and-widgets-as-code/wordpress-zones-and-widgets-as-code--diagram-1.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
		data-src="/assets/images/project/wordpress-zones-and-widgets-as-code/wordpress-zones-and-widgets-as-code--diagram-1.png?size=972" 
		alt="Zone placements"
		data-lazy-load>
	<figcaption>Zone placements</figcaption>
</figure>

This is how a zone, group, or widget relationship is structured.

<figure class="image-figure image-border--thin">
	<img
		src="/assets/images/project/wordpress-zones-and-widgets-as-code/wordpress-zones-and-widgets-as-code--diagram-2.png?placeholder=true%26injectPlaceholder=true%26placeholderSize=500"
		data-src="/assets/images/project/wordpress-zones-and-widgets-as-code/wordpress-zones-and-widgets-as-code--diagram-2.png?size=972" 
		alt="Group and widget placements"
		data-lazy-load>
	<figcaption>Group and widget placements</figcaption>
</figure>

Now that we know what kind of structure we need let's look at the code. After registering a zone placement, you can place it using a template function.

<h3 class="code-block-notation">Register zones</h3>

```php
// Register zone.
Zones\register_zone( 'sidebar' );

// Place the zone within a template.
Zones\get_zone_template( 'sidebar' );
```

It's time to register a widget or a block of code and pass some data to the template, accessible via `$data`, as per WordPress standards. As I will show below, widget data can also be added in the context of a group. 

<h3 class="code-block-notation">Register widgets</h3>

```php
// Register newsletter sign up widget.
Zones\register_zone_widget( 'partials/newsletter-signup' );

// Register latest list widget.
Zones\register_zone_widget( 'partials/latest_list', [
    'cache_exp' => 86400,
] );

```

Finally, we'll need to register a group, assign it to a zone, and add any widgets that should be attached. In the example above, the two widgets we registered early are attached to this group, which is attached to a zone. Additionally, you may have noticed that the group definition includes priority and filters. The priority works the same way WordPress filters do, and I created a half dozen filters to control what pages and post types the group would display.

Providing granular control over secondary content placement without moving it to the client met the business goals.
