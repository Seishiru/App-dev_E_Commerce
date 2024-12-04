const webpack = require('webpack');

module.exports = function override(config) {
  // Add fallbacks for missing Node.js core modules
  config.resolve.fallback = {
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    stream: require.resolve('stream-browserify'),
    zlib: require.resolve('browserify-zlib'),
    process: require.resolve('process/browser'),
    url: require.resolve('url/'), // Ensure url module is resolved
  };

  // Ensure process is provided globally
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser', // Provide process polyfill globally
    }),
  ];

  return config;
};
    