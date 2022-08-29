var entryPointsPathPrefix = './src/';
const path = require('path');

module.exports = {

	mode: 'development',

	entry : {
		index: entryPointsPathPrefix + 'main.ts',
		/*
    	tt_pitch_class: entryPointsPathPrefix + 'core/tt_pitch_class.ts',
    	duration: entryPointsPathPrefix + 'core/duration.ts',
    	note: entryPointsPathPrefix + 'core/note.ts',
    	*/
  	},

	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: [/node_modules/, /libs/],
				use: {
					loader: 'ts-loader'
				}
			},

			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"]
			}
		]
	},

	devtool: false,

	resolve: {
		extensions: ['.ts', '.js']
	},

	devServer: {
	    static: {
	      	directory: path.join(__dirname, 'dist'),
	    },
    	compress: true,
    	port: 9000,
  	},
}