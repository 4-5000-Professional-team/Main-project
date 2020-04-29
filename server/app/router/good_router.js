//商品处理接口
const Router = require('koa-router')
const router = new Router()
const good = require('../controller/good_controller')
router.post('/addGood', good.addGood)
router.get('/allGood', good.allGood)
router.delete('/deleteGood', good.deleteGood)
module.exports = router