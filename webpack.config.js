delete process.env.TS_NODE_PROJECT;
const path = require('path');
require('dotenv').config();
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';
const config = {
	entry: './src/index.ts',
	devtool: 'inline-source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/i,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '...'],
		plugins: [
			new TsconfigPathsPlugin({
				baseUrl: './src',
				extensions: ['.ts'],
			}),
		],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';
	} else {
		config.mode = 'development';
	}
	return config;
};
