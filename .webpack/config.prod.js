/**
 * Creates individual CSS and JS bundles.
 * Builds out HTML files that get served in production.
 */

const path = require( 'path' );
const { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' );
const HTMLInlineCSSWebpackPlugin = require( 'html-inline-css-webpack-plugin' ).default;
const TerserPlugin = require( 'terser-webpack-plugin' );
const ImageMinimizerPlugin = require( 'image-minimizer-webpack-plugin' );
const postcssFlexbugsFixes = require( 'postcss-flexbugs-fixes' );
const autoprefixer = require( 'autoprefixer' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const XMLWebpackPlugin = require( 'xml-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const FaviconsWebpackPlugin = require( 'favicons-webpack-plugin' );
const HtmlWebpackSkipAssetsPlugin = require( 'html-webpack-skip-assets-plugin').HtmlWebpackSkipAssetsPlugin;
const WorkboxPlugin = require( 'workbox-webpack-plugin' );
const config = require( '../config' );
const pageHandlers = require( '../inc/page' );
const sitemapHandlers = require( '../inc/sitemap' );

const loadSassData = () => {
	return "$site-url: '" + config.protocol + "://" + config.nakedDomain + "';";
}

module.exports = async () => {

	const sitemap = await sitemapHandlers.get();

	return [ {
		mode: 'production',
		devtool: false,
		context: process.cwd(),
		watch: false,
		stats: {
			children: true,
		},

		resolveLoader: {
			alias: {
				'ejs3-loader': path.join( process.cwd(), '.webpack/ejs3-loader.js' ),
			},
		},
		entry: {
			'app-core': path.join( process.cwd(), 'assets/styles/app-core.scss' ),
			'app-features': path.join( process.cwd(), 'assets/styles/app-features.scss' ),
			'home-page-intro': path.join( process.cwd(), 'assets/scripts/home-page-intro.js' ),
			'main': path.join( process.cwd(), 'assets/scripts/app.js' ),
		},
		output: {
			path: path.join( process.cwd(), 'dist' ),
			filename: 'assets/js/[fullhash]-[name].js',
			publicPath: '/',
			assetModuleFilename: ( pathData ) => {

				// Write videos out /assets/videos/.
				if ( pathData.filename.includes( 'assets/videos' ) ) {
					return 'assets/videos/[name][ext][query]';
				}

				// Write fonts out /assets/fonts/.
				if ( pathData.filename.includes( 'assets/fonts' ) ) {
					return 'assets/fonts/[name][ext][query]';
				}

				// Image assets.
				return 'assets/images/[name][ext][query]';
			},
			clean: true,
		},

		optimization: {
			nodeEnv: 'production',
			noEmitOnErrors: true,
			minimizer: [
				new TerserPlugin({
					parallel: true,
				} ),
				new CssMinimizerPlugin(),
				new ImageMinimizerPlugin( {
					minimizer: {
						implementation: ImageMinimizerPlugin.squooshMinify,
					},
				} ),
			],
		},

		plugins: [

			new WebpackManifestPlugin( {
				fileName: 'asset-manifest.json',
				publicPath: '',
				writeToFileEmit: true,
			} ),

			new XMLWebpackPlugin( {
				files: [ {
					template: path.join( process.cwd(), 'templates/sitemap.ejs' ),
					filename: 'sitemap.xml',
					data: {
						sitemap,
						config
					}
				} ],
			} ),

			new CopyPlugin( {
				patterns: [
					{
						from: path.join( process.cwd(), 'templates/robots.txt' ),
						to: '',
					},
				],
			} ),

			new MiniCssExtractPlugin( {
				filename: 'assets/styles/[fullhash]-[name].css',
				chunkFilename: '[fullhash]-[id].css',
			} ),

			...sitemap.flatMap( ( route ) => {

				const templateData = pageHandlers.getRouteData( route.contentFile, sitemap );

				return [

					new HtmlWebpackPlugin( {
						inject: true,
						filename: `${ route.uri }`,
						publicPath: templateData.site.host,
						//publicPath: 'http://www.localhost:3000',
						excludeChunks: templateData.post.type === 'home' ? [] : [ 'home-page-intro' ],
						template: path.join( process.cwd(), `templates/base.ejs?filename=${ route.uri }` ),
						templateData,
						meta: {
							'twitter:image': templateData.site.host + templateData.post.ogImage,
							'og:image': templateData.site.host + templateData.post.ogImage,
						},
						cache: false,
						minify: true,
						excludeAssets: [
							/main.css/,
							/app-features.js/,
							/app-core.js/,
						],
					} ),

					new HTMLInlineCSSWebpackPlugin( {
						replace: false,
						filter: ( fileName ) => fileName.includes( 'app-core' ) || fileName.includes( '.html' ),
					} ),

					new HtmlWebpackSkipAssetsPlugin(),
				];
			} ),

			new FaviconsWebpackPlugin( {
				logo: path.join( process.cwd(), 'assets/images/favicon.png' ),
			} ),

			new WorkboxPlugin.GenerateSW( {
				clientsClaim: true,
				skipWaiting: true,
			} ),
		],
		module: {
			strictExportPresence: true,
			rules: [

				{
					test: /\.(eot|woff(2)?|ttf|svg)$/i,
					type: 'asset/resource',
				},

				{
					test: /\.(gif|svg|mp4)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(png|jpg|jpeg)$/i,
					use: [
						{
							loader: 'responsive-loader',
							options: {
								adapter: require( './sharp-adapter.js' ),
								publicPath: '/',
								name: `./assets/images/[name]-[width]-[quality].[ext]`,
								format: 'webp',
							},
						},

					],
					type: 'javascript/auto',
				},
				{
					test: /\.ejs$/i,
					use: [
						{
							loader: 'html-loader',
							options: {
								esModule: false,
								sources: {
									list: [
										{
											tag: 'img',
											attribute: 'src',
											type: 'src',
										},
										{
											tag: 'img',
											attribute: 'data-src',
											type: 'src',
										},
										{
											tag: 'img',
											attribute: 'data-srcset',
											type: 'srcset',
										},
										{
											tag: 'a',
											attribute: 'data-lightbox-img',
											type: 'src',
										},
										{
											tag: 'meta',
											attribute: 'content',
											type: 'src',
											filter: ( tag, attribute, attributes ) => attributes.filter( ( obj ) => obj.value === 'og:url' || obj.value === 'twitter:image' ).length !== 0,
										  },
									],
								},
							},
						},
						{
							loader: 'ejs3-loader',
						},
					]
				},
				{
					test: /\.jsx?$/,
					exclude: path.join( process.cwd(), 'node_modules' ),
					loader: require.resolve( 'babel-loader' ),
					options: { cacheDirectory: true }
				},

				{
					test: /\.s?css$/,
					use: [
						'style-loader',
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								esModule: false,
							}
						},
						{
							loader: 'css-loader',
							options: { sourceMap: true },
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									ident: 'postcss',
									sourceMap: true,
									plugins: [
										autoprefixer( { flexbox: 'no-2009' } ),
										postcssFlexbugsFixes(),
									],
								},
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								additionalData: loadSassData(),
							},
						},
					],
				},
			]
		},
		resolve: {
			roots: [ process.cwd() ],
		},
		externals: {},
	} ];
}
