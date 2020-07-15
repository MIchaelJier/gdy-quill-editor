const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'gdy-editor.js',
    library: 'numberWord',
    libraryExport: 'default',
    globalObject: 'this',
    libraryTarget: 'umd',
  },
  mode: 'production',
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': 'src',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'lib')],
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              // presets: [['es2015', { modules: false }]],
              plugins: [
                'babel-plugin-transform-class-properties',
                // 'plugin-proposal-class-properties',
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'vue-style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: ['lodash'],
    }),
    new VueLoaderPlugin(),
  ],

  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
}
