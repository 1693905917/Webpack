/**
 * 目标1：体验 webpack 打包过程
 */
// 1.1 准备项目和源代码
import { checkPhone, checkCode } from '../utils/check.js'
console.log(checkPhone('13900002020'))
console.log(checkCode('123123123123'))
// 1.2 准备 webpack 打包的环境
// 1.3 运行自定义命令打包观察效果（npm run 自定义命令）

/**
 * 目标3：用户登录-长度判断案例
 *  3.1 准备用户登录页面
 *  3.2 编写核心 JS 逻辑代码
 *  3.3 打包并手动复制网页到 dist 下，引入打包后的 js，运行
 */
// 3.2 编写核心 JS 逻辑代码
document.querySelector('.btn').addEventListener('click', () => {
    const phone = document.querySelector('.login-form [name=mobile]').value
    const code = document.querySelector('.login-form [name=code]').value
  
    if (!checkPhone(phone)) {
      console.log('手机号长度必须是11位')
      return
    }
  
    if (!checkCode(code)) {
      console.log('验证码长度必须是6位')
      return
    }
  
    console.log('提交到服务器登录...')
  })
/**
 * 目标5：打包 css 代码
 *  5.1 准备 css 代码，并引入到 js 中
 *  5.2 下载 css-loader 和 style-loader 本地软件包
 *  5.3 配置 webpack.config.js 让 Webpack 拥有该加载器功能
 *  5.4 打包后观察效果
 */
// 5.1 准备 css 代码，并引入到 js 中
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './index.less'

