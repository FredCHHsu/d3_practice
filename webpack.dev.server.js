var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var proxy = require('proxy-middleware');
var url = require('url');
var port = 8083;

module.exports = function(app) {
  app.use('/js', proxy(url.parse('http://localhost:' + port + '/js')));

  var server = new webpackDevServer(webpack(config), {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: '/js/',
    stats: { colors: true }
  }).listen( port, 'localhost', function() {
    console.log('*** Webpack Dev Server *** => socketio listen at: ' + port)
  });
}
