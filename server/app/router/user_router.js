//用户处理路由
const Router = require('koa-router')
const router = new Router()
const user = require('../controller/user_controller')
router.post('/register', user.register)
module.exports = router