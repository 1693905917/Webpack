//我们还是采用绝对路径，因为我们这个配置文件里面的代码是要在node环境中进行执行的，所以为了保证在任何地方执行都能找到它想访问的其他文件，
//所以我们使用path.resolve
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const webpack = require('webpack')

//用一个常量config来判断
const config={
  // mode: 'development',
  //entry：入口修改处  __dirname:获取当前文件所在的文件夹的绝对路径 D:\BaiduNetdiskDownload\VSCode\VSCodeFile\03_Webpack_Study\src/login/index.js
  // entry: path.resolve(__dirname, 'src/login/index.js'),
  entry:{
    'login':path.resolve(__dirname,'src/login/index.js'),
    'content':path.resolve(__dirname,'src/content/index.js'),
    'publish':path.resolve(__dirname,'src/publish/index.js'),
  },
  //output:出口修改处
  output: {
    //path:是之将打包好的文件放在哪个文件夹下
    path: path.resolve(__dirname, 'dist'),
    //存放的位置是D:\BaiduNetdiskDownload\VSCode\VSCodeFile\03_Webpack_Study\dist\login\index.js
    filename: './[name]/index.js',
    clean: true //生成打包后内容之前，清空输出目录
  },
  //插件(给Webpack提供更多功能)
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'public/login.html'), // 模板文件
      filename: path.resolve(__dirname,'dist/login/index.html'),// 输出文件
      // 自定义属性，在 html 模板中 <%=htmlWebpackPlugin.options.useCdn%> 访问使用
      useCdn: process.env.NODE_ENV === 'production',
      chunks:['login'] //影人哪些打包后的模块（和entry的key一致）
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'public/content.html'), // 模板文件
      filename: path.resolve(__dirname,'dist/content/index.html'),// 输出文件
      // 自定义属性，在 html 模板中 <%=htmlWebpackPlugin.options.useCdn%> 访问使用
      useCdn: process.env.NODE_ENV === 'production',
      chunks:['content'] //影人哪些打包后的模块（和entry的key一致）
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'publish/publish.html'), // 模板文件
      filename: path.resolve(__dirname,'dist/publish/index.html'),// 输出文件
      // 自定义属性，在 html 模板中 <%=htmlWebpackPlugin.options.useCdn%> 访问使用
      useCdn: process.env.NODE_ENV === 'production',
      chunks:['publish'] //影人哪些打包后的模块（和entry的key一致）
    }),
    new MiniCssExtractPlugin({
      //在MiniCssExtractPlugin插件是不能用绝对路径的，只能用相对路径
      filename:'./[name]/index.css'
    }),
    new webpack.DefinePlugin({
      // key 是注入到打包后的前端 JS 代码中作为全局变量
      // value 是变量对应的值（在 corss-env 注入在 node.js 中的环境变量字符串）
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: { // 加载器
    rules: [ // 规则列表
      {
        test: /\.css$/i, // 匹配 .css 结尾的文件
        //use: ['style-loader', 'css-loader'], // 使用从后到前的加载器来解析 css 代码和插入到 DOM  不要颠倒顺序
        //use: [MiniCssExtractPlugin.loader, "css-loader"],
        use: [process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less$/i,
       // use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
       use: [
        // compiles Less to CSS
        process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader',
      ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      }
    ]
  },
  // 优化
  optimization: {
    // 最小化
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 
      // `terser-webpack-plugin`），将下一行取消注释（保证 JS 代码还能被压缩处理）
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  //解析
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
//开发环境下使用source-map
if(process.env.NODE_ENV === 'development'){
  config.devtool='inline-source-map'
}

// 生产环境下使用相关配置
if (process.env.NODE_ENV === 'production') {
  // 外部扩展（让 webpack 防止 import 的包被打包进来）
  config.externals = {
    // key：import from 语句后面的字符串
    // value：留在原地的全局变量（最好和 cdn 在全局暴露的变量一致）
    'bootstrap/dist/css/bootstrap.min.css': 'bootstrap',
    'axios': 'axios',
    'form-serialize':'serialize',
    '@wangeditor/editor':'wangeditor'
  }
}
module.exports = config


