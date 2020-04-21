//创建用户集合
const mongoose = require('mongoose')
const schema = mongoose.Schema
const user = new schema({
    username: String,//用户名
    password: String,//密码
    mobile: String,//手机号
    createDate: Number,//创建时间
    lastUpdate: Number//上次更新时间
})
module.exports = mongoose.model('users', user)