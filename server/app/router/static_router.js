const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const index = async ctx => {
    ctx.response.status = 200
    ctx.response.body = fs.createReadStream('./static/index')
}
router.get('/', index)
module.exports = router