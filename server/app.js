const koa = require('koa') //引入koa框架
const app = new koa() //对koa框架进行实例化
const config = require('./config') //引入配置文件
const koaStatic = require('koa-static') //引入处理静态资源的koa-static模块
const path = require('path') //引入处理路径模块
let root = path.resolve('.') //得到根目录
app.use(koaStatic(path.join(root, '/static'))) //配置静态资源路径
const static_router = require('./app/router/static_router') //引入静态页面路由
app.use(static_router.routes()).use(static_router.allowedMethods()) //把静态页面路由部署到服务器
app.listen(config.port) //设置服务器端口
console.log(`server is running at 127.0.0.1:${config.port}`)
