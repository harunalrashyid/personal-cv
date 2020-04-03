const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const webpackConfig = {
	output: {
		path: path.resolve(__dirname, './public'),
		filename: 'assets/js/[name].[hash:8].js',
		chunkFilename: 'assets/js/[name].[hash:8].chunk.js',
		publicPath: '/',
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
	},
	devServer: {
		contentBase: path.resolve(__dirname, './views'),
		compress: true,
		open: true,
		quiet: true,
		port: 5000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true }		
					}
				]
			}
		]
	},
	optimization: {
		minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true
                },
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
	},
	plugins: [
		new HtmlWebPackPlugin({
			hash: true,
			template: './views/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
            filename: "assets/css/[name].[hash:8].css"
        })
	]
};

module.exports = webpackConfig;