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
  // chainWebpack(config) {
  //   config.module
  //     .rule('svg')
  //     .exclude.add(resolve('src/lib/editor/assets/icons'))
  //     .end()
  // },
}
