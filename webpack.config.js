const path = require("path");
const webpack = require("webpack");

const entryPath = "09_projekt_koncowu";

module.exports = {
	mode: "none",
	// entry: `./${entryPath}/js/app.js`,// to bulo do fetch do 07_dzien4
	entry: ["whatwg-fetch", `./${entryPath}/js/app.js`],
	devtool: "inline-source-map",
	output: {
		filename: "out.js",
		path: path.resolve(__dirname, `${entryPath}/build`),
		clean: true,
	},
	devServer: {
		open: true,
		hot: true,
		static: [
			{
				directory: path.join(__dirname, entryPath),
				publicPath: "/",
				serveIndex: true,
			},
		],
		devMiddleware: {
			writeToDisk: true,
		},
		compress: true,
		port: 3001,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
		],
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
	],
};
