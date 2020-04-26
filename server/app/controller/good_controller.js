//商品接口中间件
const goods = require('../model/good.schema')
//添加商品
const addGood = async (ctx, next) => {
    ctx.cookies.set('user', '13333333333', {
        expires: new Date('2020-05-30'),
        httpOnly: true,
        overwrite: false
    })
    // console.log(ctx.cookies.get("user"))
    ctx.response.body = {
        msg: 'test',
        code: 200
    }
}
module.exports = {
    addGood,
}