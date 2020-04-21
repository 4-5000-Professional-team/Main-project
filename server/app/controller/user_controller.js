//处理用户接口的callback
const users = require('../model/user_schema')
//注册
const register = async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = {
        msg: '成功接通',
        code: 200
    }
}
module.exports = {
    register,
}