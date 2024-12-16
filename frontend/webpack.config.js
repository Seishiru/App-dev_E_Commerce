const webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],  // Add necessary extensions
    fallback: {
      process: require.resolve('process/browser'),
      // Add other fallbacks here if needed
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
