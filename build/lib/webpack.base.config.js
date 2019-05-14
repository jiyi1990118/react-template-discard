/**
 * Created By Jianwei.Xu
 * Author server@xiyuan.name (惜缘叛逆)
 * DateTime 2019/5/6 20:59
 * Describe javascript功能描述
 * MIT License http://www.opensource.org/licenses/mit-license.php
 */

const __DEV__ = process.env.NODE_ENV !== 'production';
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const GetEAP = require('./GetEAP');
const config = require('./config');
module.exports = {
	mode: __DEV__ ? 'development' : 'production',
	entry: [path.resolve(config.comm.srcDir, 'index.tsx')],
	output: {
		path: config.comm.outDir,
		publicPath: __DEV__ ? config.dev.assertPublicPath : config.pro.assertPublicPath,
	},
	module: {
		rules: [{
			test: /\.(css|scss)$/,
			use: [
				MiniCssExtractPlugin.loader,
				'style-loader',
				'css-loader',
				'postcss-loader',
				'sass-loader'
			]
		}, {
			test: /\.html$/,
			loader: 'html-loader?attrs=img:src img:data-src',
		}, {
			test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: 'file-loader?limit=1024&name=static/fonts/[name].[ext]'
		}, {
			test: /\.js$/,
			use: ['babel-loader', 'source-map-loader'],
			exclude: /node_modules/
		}, {
			test: /\.tsx?$/,
			loader: [
				'ts-loader',
				'babel-loader'
			],
			exclude: /node_modules/
		}]
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
	},
	stats: {children: false},
	plugins: new GetEAP(),
	node: {
		fs: 'empty'
	},
};