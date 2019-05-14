/**
 * Created By Jianwei.Xu
 * Author server@xiyuan.name (惜缘叛逆)
 * DateTime 2019/5/6 21:04
 * Describe javascript功能描述
 * MIT License http://www.opensource.org/licenses/mit-license.php
 */

const path = require('path');

module.exports = {
	dev: {
		// 静态资源输出路径
		assertPublicPath: './',
		port: '8088',
		host: 'localhost',
		poll: false
	},
	pro: {
		// 静态资源输出路径
		assertPublicPath: './',
	},
	comm: {
		// 项目源文件目录
		srcDir: path.resolve(__dirname, '../../', 'src'),
		// 项目输出的文件目录
		outDir: path.resolve(__dirname, '../../', 'dist'),
	}
};