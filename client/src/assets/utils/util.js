module.exports = {
    //创建cookies 
    setCookie(c_name, value, expiredays) {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    },

    //读取cookies 
    getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    },
    //删除
    delCookie(name) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },
    addgood(point, good) {
        point.$confirm(`确定添加${good.goodname}`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            const datalist = point.$store.state.mealdata
            const data = {
                goodname: good.goodname,
                price: good.price,
                num: 1
            }
            let flag = true;
            for (const item of datalist) {
                if (!(item.goodname == data.goodname)) {
                    flag = true
                } else {
                    flag = false
                    break
                }
            }
            if (flag) {
                point.$message({
                    type: 'success',
                    message: '添加成功!'
                });
                datalist.push(data)
            } else {
                point.$message({
                    type: 'info',
                    message: '添加商品已存在'
                });
            }
        }).catch(() => {
            point.$message({
                type: 'info',
                message: '已取消添加'
            });
        });
    }
}