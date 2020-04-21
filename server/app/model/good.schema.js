//创建商品集合
const mongoose = require('mongoose')
const schema = mongoose.Schema
const good = new schema({
    goodname: String,//商品名
    price: Number,//商品单价
    num: Number,//商品库存数量
    desc: String,//商品描述
    recommend: Number,//商品推荐指数
    isDrink: Boolean,//是否是饮料
    isCombo: Boolean,//是否是套餐
    type: String,//商品类型
    isRecommend: Boolean,//是否是推荐菜
    sailNum: Number,//商品卖出数量
    isOff: Boolean,//是否打折
    percent: Number,//折扣幅度
    material: Array,//商品材料
    tast: String//商品口味
})
module.exports = mongoose.model('goods', good)