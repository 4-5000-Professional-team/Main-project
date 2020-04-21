//创建订单集合
const mongoose = require('mongoose')
const schema = mongoose.Schema
const order = new schema({
    orderNo: String,//下单编号
    orderStatus: String,//下单状态
    detail: Array,//下单包含的商品
    createTime: Number,//下单时间
    way: String,//支付方式
    price: Number,//订单总金额
    payTime: Number,//支付时间
    createPersonName: String,//订单用户名
    createPonsonId: Number//订单用户id
})
module.exports = mongoose.model('orders', order)