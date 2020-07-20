const path = require('path')
const port = 8080
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'dist',
  lintOnSave: false,
  productionSourceMap: false,

  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },

  configureWebpack: {
    name: 'test',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },

  chainWebpack: (config) => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/lib/editor/lib/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(
          __dirname,
          'src/lib/quill-emoji/src/scss/core/_variables.scss'
        ),
      ],
    },
  },
}
