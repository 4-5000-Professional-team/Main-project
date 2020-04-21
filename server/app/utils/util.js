module.exports = {
    //创建随机订单编号
    createOrderNum() {
        let random_num = ''
        for (let i = 0; i < 6; i++) {
            random_num += Math.floor(Math.random() * 10)
        }
        random_num += new Date().getTime()
        return random_num
    }
}