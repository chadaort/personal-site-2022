Due to Guild Wars' popularity, Guild Wars 2 received a lot of hype before its release. ArenaNet had more autonomy than our other studios, so we usually supported them rather than fully managing their projects. 

They had decided to use [WordPress](https://wordpress.com/) for content publishing and at that time, our servers team was adamant that we build static sites for marketing material. We used [Movable Type](https://movabletype.org/) for most marketing sites but the GW2 team really wanted to use WordPress. To deploy the WordPress site as static code, we developed a WordPress plugin. 

I wasn't familiar with the WordPress plugin architecture at the time, but I had a lot of experience building static sites. The deployment routine would remain the same which was just using `rsync` to push changes to multiple web instances. I used filters to modify their data based on the environment the site was operating in. Most of the work involved creating the build process to generate the static HTML files.

We were able to meet the system engineers' functional requirements and the studio was delighted that they could work in WordPress.


