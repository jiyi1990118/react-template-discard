/**
 * Created By xiyuan
 * Author server@xiyuan.name (惜缘叛逆)
 * DateTime 2019/5/7 4:00 PM
 * Describe javascript功能描述
 * MIT License http://www.opensource.org/licenses/mit-license.php
 */


'use strict';
const path = require('path');
const escape = require('escape-string-regexp');

const webpack = require("webpack");
const merge = require('webpack-merge');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./lib/config');
const proxys = require('./lib/proxys');
const devConfig = require('./webpack.dev.config');

const PORT = config.dev.port || 8080;
const HOST = process.env.HOST ||config.dev.host || '0.0.0.0';
const PROTOCOL = process.env.HTTPS === 'true' ? 'https' : 'http';
const requestURL = `${PROTOCOL}://${HOST}:${PORT}`;


function ignoredFiles(appSrc) {
	return new RegExp(
		`^(?!${escape(
			path.normalize(appSrc + '/').replace(/[\\]+/g, '/')
		)}).+/node_modules/`,
		'g'
	);
};

const devServer = {
	host: HOST,
	// 关闭host头信息检查（避免nginx 代理错误）
	disableHostCheck: process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
	// 是否启用资源压缩
	compress: true,
	// 不输出启动 log
	noInfo: false,
	// 在 inline 模式下用于控制在浏览器中打印的 log 级别，如`error`, `warning`, `info` or `none`.
	clientLogLevel: 'none',
	// 站点dist路径
	contentBase: config.outDir,
	// contentBase: false, // since we use CopyWebpackPlugin.
	// 观察站点内容是否有变化
	watchContentBase: true,
	// 是否启用热更新
	hot: true,
	// output.path 的虚拟路径映射
	publicPath: '/',
	// 不在控制台打印任何 log
	quiet: true,
	// webpack 的 watch 配置，每隔多少秒检查文件的变化
	watchOptions: {
		ignored: ignoredFiles(config.srcDir),
		poll: config.dev.poll,
	},
	// 是否启用https
	https: PROTOCOL === 'https',
	// 是否覆盖
	overlay: false,
	// 当使用 HTML 5 的 history API 的时候，当 404 出现的时候可能希望使用 index.html 来作为请求的资源，这时候可以使用这个配置 :historyApiFallback:true
	historyApiFallback: {
		// 带点的路径仍应使用历史回退。
		// 使用 disableDotRule 来满足一个需求，即如果一个资源请求包含一个 .符号
		// disableDotRule: true,
		rewrites: [
			{from: /.*/, to: path.posix.join(config.dev.assertPublicPath, 'index.html')},
		],
	},
	// public: allowedHost,
	// 代理
	proxy: proxys,
	// 打包状态信息输出配置
	stats: {colors: true},
	//设置自定义 http 头
	headers: {"X-Custom-Header": "custom-content"},
	// 执行之前的中间件
	before(app, server) {
	
	},
};


const appServer = new WebpackDevServer(webpack(merge(devConfig, {
	entry: []
	//添加HMR文件
		.concat("webpack/hot/dev-server")
		.concat(`webpack-dev-server/client?${requestURL}`)
		.concat('react-hot-loader/patch'),
	plugins: [
	
	]
})), devServer);

appServer.listen(PORT, HOST, function (err) {
	if (err) {
		console.log(err);
	}
});

console.log(`listen at ${requestURL}`);