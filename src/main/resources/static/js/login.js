function login() {
    var user = $("#user_login").val();
    var password = $("#user_pass").val();
    if (user == "") {
        alert("用户名不可为空!");
    } else if (password == "") {
        alert("密码不可为空!");
    } else {
        $.ajax({
            async : false,// 同步false:待请求完毕后再执行后面的代码
            type : "POST",
            url : 'user/loginVerify.do',
            contentType : "application/x-www-form-urlencoded; charset=utf-8",
            data : $("#loginForm").serialize(),
            dataType : "json",
            success : function(data) {
                if (data.code == 0) {
                    alert(data.msg);
                } else {
                    window.location.href = "index.html";
                }
            },
            error : function() {
                alert("数据获取失败!")
            }
        })
    }
}