module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => { },
  configureWebpack: () => { },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  runtimeCompiler:true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    host: '0.0.0.0',
    port: 9001,
    https: false,
    hot: true,
    hotOnly: false,
    overlay: {
      warnings: true,
      errors: false
    },
    proxy: {
      '/': {
        target: 'http://t.jialandao.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          // '^/devcms': '/cms_api'
        }
      }
    }, // 设置代理
    before: app => { }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  },
  pages: {
    yunshi: {
      // page 的入口
      entry: 'src/yunshi/main.js',
      // 模板来源
      template: 'public/yunshi.html',
      // 在 dist/index.html 的输出
      filename: 'yunshi.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '每日运势',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'yunshi']
    },
    gua: {
      // page 的入口
      entry: 'src/gua/main.js',
      // 模板来源
      template: 'public/gua.html',
      // 在 dist/index.html 的输出
      filename: 'gua.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '一撮金',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'gua']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  }
}
