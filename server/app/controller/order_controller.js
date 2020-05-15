const orders = require('../model/order_schema')
const users = require('../model/user_schema')
const util = require('../utils/util')
const addorder = async (ctx, next) => {
    const orderdata = ctx.request.body
    const user = ctx.cookies.get('user')
    if (!orderdata.length > 0) {
        ctx.response.body = {
            code: 400,
            msg: '请先点餐'
        }
        return false
    }
    const userinfo = await users.findOne({ mobile: user })
    const username = userinfo.username
    let price = 0
    for (const item of orderdata) {
        price += item.num * item.price
    }
    const order = new orders({
        orderNo: util.createOrderNum(),
        orderStatus: '已下单',
        detail: orderdata,
        createTime: new Date().getTime(),
        way: '微信支付或支付宝',
        price: price,
        payTime: new Date().getTime(),
        createPersonName: username,
        createPonsonId: user
    })
    await order.save().then(() => {
        ctx.response.body = {
            code: 200,
            msg: '您已下单,请前往订单查看详情'
        }
    }).catch(err => {
        console.log(err)
    })
}
const queryorder = async (ctx, next) => {
    const orderdata = await orders.find()
    ctx.response.body = {
        code: 200,
        data: orderdata
    }
}
const removeall = async (ctx, next) => {
    const order = await orders.find()
    if (order.length > 0) {
        await orders.deleteMany({}).then(() => {
            ctx.response.body = {
                code: 200,
                msg: '删除成功'
            }
        }).catch(err => {
            console.log(err)
        })
    } else {
        ctx.response.body = {
            code: 400,
            msg: '订单为空'
        }
    }

}
module.exports = {
    addorder,
    queryorder,
    removeall
}