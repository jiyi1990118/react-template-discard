/**
 * Created By Jianwei.Xu
 * Author server@xiyuan.name (惜缘叛逆)
 * DateTime 2019/5/6 21:01
 * Describe javascript功能描述
 * MIT License http://www.opensource.org/licenses/mit-license.php
 */

const merge = require('webpack-merge');
const webpackBaseConfig = require('./lib/webpack.base.config');
const config  = require('./lib/config');

module.exports = merge(webpackBaseConfig, {
	output: {
		path: config.comm.outDir,
		publicPath: config.pro.assertPublicPath,
		filename: 'static/js/[name].[hash].min.js',
	},
});