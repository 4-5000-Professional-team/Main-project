//商品接口中间件
const goods = require('../model/good.schema')
//添加商品
const addGood = async (ctx, next) => {
    const form = ctx.request.body
    if (!(form.goodname.length > 0)) {
        ctx.response.body = { msg: '缺少必要信息', code: 400 }
        return false
    }
    if (!(form.material.length > 0)) {
        ctx.response.body = { msg: '缺少必要信息', code: 400 }
        return false
    }
    if (!(form.tast.length > 0)) {
        ctx.response.body = { msg: '缺少必要信息', code: 400 }
        return false
    }
    const gooddata = await goods.findOne({ goodname: form.goodname })
    if (!!gooddata) {
        ctx.response.body = { msg: '商品已存在', code: 400 }
        return false
    }
    let good = new goods({
        goodid: new Date().getTime(),
        goodname: form.goodname,
        price: form.price,
        num: form.num,
        desc: form.desc,
        recommend: form.recommend,
        isDrink: form.isDrink,
        isCombo: form.isCombo,
        type: form.type,
        isRecommend: form.isRecommend,
        sailNum: form.sailNum,
        isOff: form.isOff,
        percent: form.percent,
        material: form.material,
        tast: form.tast
    })
    await good.save().then(async () => {
        const goodlist = await goods.find()
        ctx.response.body = {
            msg: '商品插入成功',
            code: 200,
            data: goodlist
        }
    }).catch(err => {
        console.log(err)
        ctx.response.body = {
            msg: '商品插入失败',
            code: 500
        }
    })
}
//查看所有商品
const allGood = async (ctx, next) => {
    const goodlist = await goods.find()
    if (!(!!goodlist)) {
        ctx.response.body = {
            msg: '暂无商品',
            code: 400
        }
        return false
    }
    ctx.response.body = {
        msg: '获取仓库商品',
        code: 200,
        data: goodlist
    }
}
//删除商品
const deleteGood = async (ctx, next) => {
    const form = ctx.request.body
    console.log(form)
    const good = await goods.findOne({ goodid: form })
    if (!!good) {
        await goods.remove({ goodid: form }).then(async () => {
            const goodlist = await goods.find()
            ctx.response.body = {
                msg: '删除成功',
                code: 200,
                data: goodlist
            }
        }).catch(err => {
            ctx.response.body = {
                msg: '删除失败',
                code: 200
            }
            console.log(err)
        })
    } else {
        ctx.response.body = {
            msg: '没找到该商品',
            code: 404
        }
    }
}
module.exports = {
    addGood,
    allGood,
    deleteGood,
}