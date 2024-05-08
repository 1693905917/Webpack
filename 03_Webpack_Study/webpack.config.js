//我们还是采用绝对路径，因为我们这个配置文件里面的代码是要在node环境中进行执行的，所以为了保证在任何地方执行都能找到它想访问的其他文件，
//所以我们使用path.resolve
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
module.exports = {
  //entry：入口修改处  __dirname:获取当前文件所在的文件夹的绝对路径 D:\BaiduNetdiskDownload\VSCode\VSCodeFile\03_Webpack_Study\src/login/index.js
  entry: path.resolve(__dirname, 'src/login/index.js'),
  //output:出口修改处
  output: {
    //path:是之将打包好的文件放在哪个文件夹下
    path: path.resolve(__dirname, 'dist'),
    //存放的位置是D:\BaiduNetdiskDownload\VSCode\VSCodeFile\03_Webpack_Study\dist\login\index.js
    filename: './login/index.js',
    clean: true //生成打包后内容之前，清空输出目录
  },
  //插件(给Webpack提供更多功能)
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'public/login.html'), // 模板文件
      filename: path.resolve(__dirname,'dist/login/index.html') // 输出文件
    }),
    new MiniCssExtractPlugin()
  ],
  module: { // 加载器
    rules: [ // 规则列表
      {
        test: /\.css$/i, // 匹配 .css 结尾的文件
        //use: ['style-loader', 'css-loader'], // 使用从后到前的加载器来解析 css 代码和插入到 DOM  不要颠倒顺序
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
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
  }
}


