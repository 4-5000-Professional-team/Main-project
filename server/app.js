const koa = require('koa')
const app = new koa()
const config = require('./config')
const koaStatic = require('koa-static')
const path = require('path')
let root = path.resolve('.')
app.use(koaStatic(path.join(root, '/static'))) //配置静态资源路径
//静态路由配置
const static_router = require('./app/router/static_router')
app.use(static_router.routes()).use(static_router.allowedMethods())
app.listen(config.port)
console.log(`server is running at 127.0.0.1:${config.port}`)
