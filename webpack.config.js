var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var port = 8083;

//standard mode
////////////////////////////////////
var webpack_config = {
    entry: path.resolve(__dirname, 'app/main.js'),
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle_main.js',
    },
    module:{
      loaders:[
        {
          test: /\.css$/,
          exclude: [node_modules_dir],
          loaders: [ 'style', 'css' ]
        }
      ]
    }
};

//devlopment mode
////////////////////////////////////
if( process.env.NODE_ENV == 'dev') {
    webpack_config.entry = {
      'bundle_main': [
        './app/main.js', 'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:'+port
      ],
    }
    webpack_config.plugins = [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
}

module.exports = webpack_config;
