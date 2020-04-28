module.exports = {
    //创建cookies 
    setCookie(c_name, value, expiredays) {
        let exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    },

    //读取cookies 
    getCookie(name) {
        let arr, reg = new RegExp(`(^| )${name} =([^;]*)(;|$)`);
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
    }
}