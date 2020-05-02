//服务器main entry
const koa = require('koa') //引入koa框架
const app = new koa() //对koa框架进行实例化
const config = require('./config') //引入配置文件
const koaStatic = require('koa-static') //引入处理静态资源的koa-static模块
const path = require('path') //引入处理路径模块
const koaBody = require('koa-body')//引入解析post请求模块
let root = path.resolve('.') //得到根目录
app.use(koaStatic(path.join(root, '/static'))) //配置静态资源路径
app.use(koaBody({
    multipart: true,
    strict: false,//是否启用严格模式。默认true，关掉可以解析delete请求参数
}))
const cors = require('koa-cors') //解决跨域问题
app.use(cors({
    origin: 'http://localhost:8080',    // 前端地址
    credentials: true //允许携带cookie
}))
const mongoose = require('mongoose') //引入连接数据库模块
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('database connect is connected')
})
mongoose.connection.on('disconnected', () => {
    console.log('database connect is disconnected')
})
mongoose.connection.on('error', () => {
    console.log('database connect is error')
})
const static_router = require('./app/router/static_router') //引入静态页面路由
app.use(static_router.routes()).use(static_router.allowedMethods()) //把静态页面路由部署到服务器
const user_router = require('./app/router/user_router')
app.use(user_router.routes()).use(user_router.allowedMethods())
const good_router = require('./app/router/good_router')
app.use(good_router.routes()).use(good_router.allowedMethods())
const order_router = require('./app/router/order_router')
app.use(order_router.routes()).use(order_router.allowedMethods())
app.listen(config.port) //设置服务器端口
console.log(`server is running at 127.0.0.1:${config.port}`)
