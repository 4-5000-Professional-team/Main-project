//处理用户接口的callback
const users = require('../model/user_schema')
//注册
const register = async (ctx, next) => {
    const req = ctx.request.body
    //判断请求参数是否为空
    if (Object.keys(req).length == 0) {
        ctx.response.body = {
            msg: '缺少必要信息',
            code: 400
        }
        return false
    }
    //对请求参数进行判断是否符合要求
    const usernameReg = /^[a-zA-Z0-9_-]{4,16}$/ //用户名正则，4到16位（字母，数字，下划线，减号)
    //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    const passwordReg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
    //手机号正则
    const mobileReg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/
    if (!usernameReg.test(req.username) || req.username == undefined) {
        ctx.response.body = {
            msg: '用户名规则:4到16位（字母，数字，下划线，减号)',
            code: 400
        }
        return false
    }
    if (!passwordReg.test(req.password)) {
        ctx.response.body = {
            msg: '密码规则:最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符',
            code: 400
        }
        return false
    }
    if (!req.password === req.cfm) {
        ctx.response.body = {
            msg: '两次密码不一致',
            code: 400
        }
        return false
    }
    if (!mobileReg.test(req.mobile)) {
        ctx.response.body = {
            msg: '无法识别手机号',
            code: 400
        }
        return false
    }
    //验证手机号是否重复
    let userMobile = await users.find({ mobile: req.mobile })
    if (userMobile.length > 0) {
        ctx.response.body = {
            msg: '该手机号已被注册',
            code: 400
        }
        return false
    }
    //符合要求后创建新的document
    let user = new users({
        username: req.username,
        password: req.password,
        mobile: req.mobile,
        createDate: new Date().getTime(),
        lastUpdate: new Date().getTime()
    })
    //插入到数据库的users集合中
    await user.save().then(() => {
        ctx.response.body = {
            msg: '注册成功',
            code: 200
        }
    }).catch(err => {
        ctx.response.body = {
            msg: '后台服务器故障',
            code: 500
        }
    })
    //注册成功
}
//登录
const logoin = async (ctx, next) => {
    const req = ctx.request.body
    //判断参数是否为空
    if (!Object.keys(req).length > 0) {
        ctx.response.body = {
            msg: '参数不能为空',
            code: 400
        }
        return false
    }
    const user = await users.findOne({ mobile: req.mobile })
    if (Object.keys(user).length > 0) {
        if (user.password === req.password) {
            //设置cookies
            ctx.cookies.set('user', user.mobile, {
                maxAge: 30 * 24 * 60 * 60 * 1000, // cookie失效时间30天后
                httpOnly: true,  // 是否只用于http请求中获取
                overwrite: false  // 是否允许重写
            })
            ctx.response.body = {
                msg: '登陆成功',
                code: 200
            }
        } else {
            ctx.response.body = {
                msg: '密码有误',
                code: 400
            }
        }
    }
}
module.exports = {
    register,
    logoin
}