const path = require('path');

module.exports = {
	pages: {
		index: {
			entry: "src/main.js",
			template: "public/index.html",
			filename: "index.html",
		},
	},
	devServer: {
		host: "0.0.0.0",
		port: 9090, // CHANGE YOUR PORT HERE!
		clientLogLevel: "warning",
		hot: true,
		contentBase: "dist",
		compress: true,
		open: true,
		overlay: { warnings: false, errors: true },
		publicPath: "/",
		quiet: true,
		watchOptions: {
			poll: false,
			ignored: /node_modules/,
		},
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				pathRewrite: { "^/api": "/api" },
				changeOrigin: true,
				logLevel: "debug",
			},
		},
	},
	chainWebpack: (config) => {
		config.module
			.rule("vue")
			.use("vue-loader")
			.loader("vue-loader")
			.tap((options) => {
				options.compilerOptions.preserveWhitespace = true;
				return options;
			});
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.join(__dirname, 'src/'),
				'@assets/': path.join(__dirname, 'assets/'),
			}
		}
	},
	productionSourceMap: false,
	// assetsDir: "./assets/",
	// configureWebpack: {
	//   plugins: [
	//     new CopyWebpackPlugin([
	//       {from: "src/assets/images", to: "assets/img"},
	//     ])
	//   ]
	// },

	lintOnSave: false,
	pluginOptions: {},

	transpileDependencies: ["vue-echarts", "resize-detector"],
};