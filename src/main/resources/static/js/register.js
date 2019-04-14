$(function() {
	var form = $('#registerForm');
	form.bootstrapValidator({
		message: '请重新输入',
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields :{
			password:{
				message:'密码验证失败',
				validators: {
					notEmpty: {
						message:'密码不能为空'
					},
					stringLength: {
						min: 6,
						max: 16,
						message: '密码长度必须在6到16位之间'
					}
				}
			},
			username: {
                threshold:3,//有3字符以上才发送ajax请求
				message: '用户名验证失败',
				validators: {
                    notEmpty: {
						message: '用户名不能为空'
					},
                    stringLength: {
                        min: 3,
                        max: 12,
                        message: '用户名由3-12位字符组成'
                    },
                    regexp: {
						regexp: /^[a-zA-Z0-9_]+$/,
						message: '用户名必须是字母、数字或下划线'
					},
                    remote: {//ajax验证 server result:{"valid",true or false}
                        url:"user/checkUserName.do",
                        message:'用户名已存在,请重新输入',
                        delay:1000,//ajax刷新的时间是1秒一次
                        type:'POST'
                    }
				}
			},
			email: {
				validators: {
					notEmpty: {
						message: '邮箱不能为空'
					},
                    regexp: {
                        regexp: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
                        message: '请输入正确的邮件地址如：123@qq.com'
                    },
				}
			},
            phone: {
                threshold:11,//有3字符以上才发送ajax请求
                message: 'The phone is not valid',
                validators: {
                    notEmpty: {
                        message: '手机号码不能为空'
                    },
                    regexp: {
                        regexp: /^1[3|5|8]{1}[0-9]{9}$/,
                        message: '请输入正确的手机号码'
                    },
                    remote: {//ajax验证 server result:{"valid",true or false}
                        url: "user/checkPhone.do",
                        message: '该手机号已注册',
                        delay: 1000,//ajax刷新的时间是1秒一次
                        type: 'POST'
                    }
                }
            },
            repassword:{
				validators: {
					notEmpty: {
						message: '确认密码不能为空'
					},
					identical: {
						field: 'password',
						message: '两次密码必须一致'
					}
				}
			}
		}
	});


$('#validateBtn').click(function() {
        var phone_value = $("#phone").val();
        var username_value = $("#username").val();
        var password_value = $("#password").val();
        var email_value = $("#email").val();
        var trueName_value = $("#trueName").val();
        var gender = $(".radio_input input");
        var gender_value = "";
        if(gender[0].checked){
            gender_value = "male";
        }
        if(gender[1].checked){
            gender_value = "female";
        }
		var bv = form.data('bootstrapValidator');
		bv.validate();
		if (bv.isValid()) {//获取验证结果，如果成功，执行下面代码
			$.ajax({
				type : "post",
				url : 'user/register.do',
                dataType : "json",
				data : {
                    "phone":phone_value,
                    "username":username_value,
                    "password":password_value,
                    "gender":gender_value,
                    "email":email_value,
                    "trueName":trueName_value
				},
				success : function(data) {
					if (data.code == 0) {
						alert(data.msg);
					} else {
                        alert(data.msg);
                        //window.location.href="/login.html";
					}
				},
				error : function() {
					alert("注册失败!")
				}
			}) 
	    }
	});
});


