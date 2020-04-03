const path = require('path')

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let pathsToClean = [
    'dist',
    'build'
]

let cleanOptions = {
    root: __dirname,
    verbose: false, // Write logs to console.
    dry: false
}

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
					MiniCssExtractPlugin.loader,
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
		new CleanWebpackPlugin(),
		new HtmlWebPackPlugin({
			hash: true,
			template: './views/index.html',
			filename: './index.html',
			favicon: './views/favicon.ico'
		}),
		new MiniCssExtractPlugin({
            filename: "assets/css/[name].[hash:8].css"
        })
	]
};

module.exports = webpackConfig;