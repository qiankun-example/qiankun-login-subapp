const { name } = require('./package.json')
/**@type{ import('@vue/cli-service').ProjectOptions} */
const cdn = {
  dev: {
    js: []
  },
  prd: {
    js: [
      // vue
      '//cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js'
    ]
  }
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/login' : 'http://localhost:8002',
  outputDir: 'login',
  chainWebpack: config => {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    config.plugin('html')
      .tap(args => {
        args[0].cdn = process.env.NODE_ENV === 'production' ? cdn.prd : cdn.dev
        return args
      })
  },
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    externals: process.env.NODE_ENV === 'production' ?
      {
        vue: "Vue"
      } : {}
  },
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true // 把请求头中host配置target
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true // 把请求头中host配置target
      }
    }
  },
  productionSourceMap: false
}