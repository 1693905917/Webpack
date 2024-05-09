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
// document.querySelector('.btn').addEventListener('click', () => {
//     const phone = document.querySelector('.login-form [name=mobile]').value
//     const code = document.querySelector('.login-form [name=code]').value
  
//     if (!checkPhone(phone)) {
//       console.log('手机号长度必须是11位')
//       return
//     }
  
//     if (!checkCode(code)) {
//       console.log('验证码长度必须是6位')
//       return
//     }
  
//     console.log('提交到服务器登录...')
//   })
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
/**
 * 目标9：打包资源模块（图片处理）
 *  9.1 创建 img 标签并动态添加到页面，配置 webpack.config.js
 *  9.2 打包后观察效果和区别
 */
// 9.1 创建 img 标签并动态添加到页面，配置 webpack.config.js
// 注意：js 中引入本地图片资源要用 import 方式（如果是网络图片http地址，字符串可以直接写）
import imgObj from './assets/logo.png'
const theImg = document.createElement('img')
theImg.src = imgObj
document.querySelector('.login-wrap').appendChild(theImg)


/**
 * 目标10：完成登录功能
 *  10.1 使用 npm 下载 axios（体验 npm 作用在前端项目中）
 *  10.2 准备并修改 utils 工具包源代码导出实现函数
 *  10.3 导入并编写逻辑代码，打包后运行观察效果
 */
// 10.3 导入并编写逻辑代码，打包后运行观察效果
import myAxios from '../utils/request.js'
import { myAlert } from '../utils/alert.js'
document.querySelector('.btn').addEventListener('click', () => {
  const phone = document.querySelector('.login-form [name=mobile]').value
  const code = document.querySelector('.login-form [name=code]').value

  if (!checkPhone(phone)) {
    myAlert(false, '手机号长度必须是11位')
    console.log('手机号长度必须是11位')
    return
  }

  if (!checkCode(code)) {
    myAlert(false, '验证码长度必须是6位')
    console.log('验证码长度必须是6位')
    return
  }

  myAxios({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile: phone,
      code: code
    }
  }).then(res => {
    myAlert(true, '登录成功')
    // localStorage.setItem('token', res.data.token)
    // location.href = '../content/index.html'
  }).catch(error => {
    myAlert(false, error.response.data.message)
  })
})


//注意1：webpack-dev-server借助http模块创建8080默认Web服务
//注意2：默认以当前项目根目录的pub1ic文件夹的index.html作为服务器根目录
//注意3：webpack-dev-server根据配置，打包相关代码在内存当中，以output.path的值作为服务器根目录（所以可以直接自己拼接访间dist目录下内容）
console.log("自动打包")


if(process.env.NODE_ENV === 'production'){
  //就让打印语句失效
  console.log=function(){}
}
console.log("开发模式下好用，生产模式下失效")

//错误
// consolee.warning("123")


