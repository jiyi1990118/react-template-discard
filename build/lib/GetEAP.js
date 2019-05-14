/**
 * Created By Jianwei.Xu
 * Author server@xiyuan.name (惜缘叛逆)
 * DateTime 2019/5/6 20:59
 * Describe javascript功能描述
 * MIT License http://www.opensource.org/licenses/mit-license.php
 */
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const __DEV__ = process.env.NODE_ENV !== 'production';
/**
 * mini-css-extract-plugin插件
 * TODO: 将样式提取到单独的css文件中不将css打包到js中
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
/**
 * html-webpak-plugin插件，生成html插件
 * TODO: https://www.npmjs.com/package/html-webpack-plugin
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * clean-webpack-plugin插件
 * TODO: 热更新删除打包的文件
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * TODO: getPlugins
 */
class getPlugins {
	constructor() {
		const plugins = [
			new webpack.optimize.RuntimeChunkPlugin({
				name: "manifest"
			}),
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].css',
				chunkFilename: 'static/css/app.[contenthash:12].css'  // use contenthash *
			}),
			new HtmlWebpackPlugin({
				// favicon: path.join(__dirname, '..', 'static', 'favicon.ico'),
				filename: 'index.html',
				template: path.resolve(config.comm.srcDir, 'index.html'),
				inject: 'body',
				hash: true,
				chunks: ['main', 'manifest', 'vendor'],
				minify: {
					removeComments: true,
					collapseWhitespace: false
				},
				meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}
			}),
			new webpack.HotModuleReplacementPlugin(),
		];
		if (!__DEV__) {
			plugins.push(new CleanWebpackPlugin());
		}
		return plugins;
	}
}

module.exports = getPlugins;