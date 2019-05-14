/**
 * Created By Jianwei.Xu
 * Author server@xiyuan.name (惜缘叛逆)
 * DateTime 2019/5/6 21:01
 * Describe javascript功能描述
 * MIT License http://www.opensource.org/licenses/mit-license.php
 */

const merge = require('webpack-merge');
const config = require('./lib/config');
const webpackBaseConfig = require('./lib/webpack.base.config');

module.exports = merge(webpackBaseConfig, {
	output: {
		path: config.comm.outDir,
		publicPath: config.dev.assertPublicPath,
		filename: 'static/js/[name].js',
		hotUpdateChunkFilename: './static/hot/hot-update.js',
		hotUpdateMainFilename: './static/hot/hot-update.json'
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
	},
});