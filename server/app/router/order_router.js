const Router = require('koa-router')
const router = new Router()
const order = require('../controller/order_controller')
router.post('/addorder', order.addorder)
router.get('/queryorder', order.queryorder)
router.delete('/removeall', order.removeall)
module.exports = router