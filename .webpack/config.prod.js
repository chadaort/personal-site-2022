/**
 * Creates individual CSS and JS bundles.
 * Builds out HTML files that get served in production.
 */

const path = require( 'path' );
const { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' );
const BeautifyHtmlWebpackPlugin = require( '@sumotto/beautify-html-webpack-plugin' );
const postcssFlexbugsFixes = require( 'postcss-flexbugs-fixes' );
const autoprefixer = require( 'autoprefixer' );
const CopyPlugin = require( 'copy-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const XMLWebpackPlugin = require( 'xml-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const config = require( '../config' );
const pageHandlers = require( '../inc/page' );
const sitemapHandlers = require( '../inc/sitemap' );

const loadSassData = () => {
	return "$site-url: '" + config.protocol + "://" + config.nakedDomain + "';";
}

module.exports = function() {
	return sitemapHandlers.get()
		.then( sitemap => {

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
				entry: [
					path.join( process.cwd(), 'assets/styles/app.scss' ),
					path.join( process.cwd(), 'assets/scripts/app.js' ),
				],
				output: {
					path: path.join( process.cwd(), 'dist' ),
					filename: '[fullhash]-[name].js',
					clean: true,
				},

				optimization: {
					nodeEnv: 'production',
					noEmitOnErrors: true,
					minimizer: [ new CssMinimizerPlugin() ],
				},

				plugins: [

					new WebpackManifestPlugin( {
						fileName: 'asset-manifest.json',
						publicPath: '',
						writeToFileEmit: true,
					} ),

					new XMLWebpackPlugin( {
						files: [ {
							template: path.join( process.cwd(), 'sitemap.ejs' ),
							filename: 'sitemap.xml',
							data: {
								sitemap,
								config
							}
						} ],
					} ),

					new MiniCssExtractPlugin( {
						filename: 'assets/styles/[fullhash]-[name].css',
						chunkFilename: '[fullhash]-[id].css',
					} ),

					new CopyPlugin( {
						patterns: [
							{
								from: path.join( process.cwd(), 'assets/images' ),
								to: 'assets/images',
							},
							{
								from: path.join( process.cwd(), 'assets/videos' ),
								to: 'assets/videos',
							},
							{
								from: path.join( process.cwd(), 'assets/images/favicons/favicon.ico' ),
								to: '',
							},
							{
								from: path.join( process.cwd(), 'robots.txt' ),
								to: '',
							},
						],
					} ),

					...sitemap.flatMap( ( route ) => [

						new HtmlWebpackPlugin( {
							inject: true,
							filename: `${ route.uri }`,
							publicPath: config.siteUrl,
							template: path.join( process.cwd(), `templates/base.ejs?filename=${ route.uri }` ),
							templateData: pageHandlers.getRouteData( route.contentFile, sitemap ),
							cache: false,
							minify: false,
						} ),

						new BeautifyHtmlWebpackPlugin( {
							indent_size: 4,
							max_preserve_newlines: 1,
						} ),
					] ),
				],
				module: {
					strictExportPresence: true,
					rules: [
						{
							oneOf: [
								{
									test: /\.ejs$/i,
									loader: 'ejs3-loader',
								},
								{
									test: /\.jsx?$/,
									exclude: path.join( process.cwd(), 'node_modules' ),
									loader: require.resolve( 'babel-loader' ),
									options: { cacheDirectory: true }
								},
								{
									test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
									loader: 'url-loader',
									options: { limit: 8192 },
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
								{
									exclude: /\.(js|html|ejs|json)$/,
									loader: 'file-loader',
									options: {},
								},
							]
						}
					]
				},
				externals: {},
			} ];
		} );
}
