var username = /^[a-zA-Z][a-zA-z0-9\_]{5,17}/;
var id = /^[1-9][0-9]{7}$/;
var phone = /^[1-9][0-9]{10}$/;
var mail = /^[a-zA-Z0-9\_\-]+@(([a-zA-Z0-9\_\-])+\.)+[a-zA-Z]{2,4}$/;
var password = /^[0-9a-zA-Z-_][0-9a-zA-Z-_]{5,11}$/;

window.onload = function(){
    $('#reset').click(reset);
    $('#submit').click(check_submit_valid);
    $('#jump2').click(function(){
        window.location.href = "http://localhost:8000 ";
    });
    set_tips($('#name'), 'name', "用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
    set_tips($('#id'), 'id', "学号8位数字，不能以0开头");
    set_tips($('#phone'), 'phone', "电话11位数字，不能以0开头");
    set_tips($('#mail'), 'mail', "邮箱形式错误");
	set_tips($('#pass'), 'pass', "密码6~12位数字，大小写字母，中划线，下划线");
    set_tips($('#re-pass'), 'repass', '密码与重复密码不一致');
}


function reset(){
    $("#warning").children().remove();
    $("#warning").css('opacity', 0);
    $('#name').val("");
    $('#id').val("");
    $('#phone').val("");
    $('#mail').val("");
    $('p').text("");
	$('#pass').val("");
    $('#re-pass').val("");
}

function wrong_pattern(){
    var result = [];
    var name_ = $('#name').val(), id_ = $('#id').val(), phone_ = $('#phone').val(), mail_ = $('#mail').val();
	var pass_ = $('#pass').val(), repass_ = $('#re-pass').val();
    if(!username.test(name_)) result.push('用户名');
    if(!id.test(id_)) result.push('学号');
    if(!phone.test(phone_)) result.push('电话号码');
    if(!mail.test(mail_)) result.push('邮箱');
	if(!password.test(pass_)) result.push('密码');
    if(pass_!==repass_) result.push('重复密码');
    return result;
}

function validator(value, name){
    switch(name){
        case 'name':
            if(username.test(value)) return true;
            else return false;
        case 'id':
            if(id.test(value)) return true;
            else return false;
        case 'phone':
            if(phone.test(value)) return true;
            else return false;
		case 'pass':
            if(password.test(value)) return true;
            else return false;
        case 'repass':
            if(value===$('#pass').val()) return true;
            else return false;
        default:
            if(mail.test(value)) return true;
            else return false;
    }
}

function set_tips(partName, realName, text_){
	//监控输入框变化
    partName.bind("input propertychange change", function(){
        $("#warning").html="";
        $("#warning").css('opacity', 0);
		if(realName==='pass'&&$('#re-pass').val()!=='') {
			if(!validator($('#re-pass').val(),'repass')) {
				$('#'+realName+'-tip').css('color', 'red');
				$('#'+realName+'-tip').text('密码与重复密码不一致');
			}
			else {
				$('#'+realName+'-tip').css('color', 'green');
				$('#'+realName+'-tip').text("√");
			}
        }
        if(!validator(partName.val(), realName)) {
            $('#'+realName+'-tip').css('color', 'red');
            $('#'+realName+'-tip').text(text_);
        }
        else {
            $('#'+realName+'-tip').css('color', 'green');
            $('#'+realName+'-tip').text("√");
        }
    });
}

//检查提交的信息是否有效
function check_submit_valid(){
    var vname = $('#name').val(), vid = $('#id').val(), vphone = $('#phone').val(), vmail = $('#mail').val(),vpass = $('#pass').val();
    var wpattern = wrong_pattern(), len = wpattern.length, wrong = len===0?0:1;
    var repeat_arr = "", r_flag = false;
    $.post('/regist', {'name': vname, 'pass': vpass,'id': vid, 'phone': vphone, 'mail': vmail, 'flag': wrong})
        .done(
            function( data,status){
                var msg = "注册失败!";
				repeat_arr = data;
                r_flag = repeat_arr===""?0:1;
                if(wrong){
                    for(var i=0;i<len;i++){
						if(wpattern[i]==='重复密码')
							msg += '密码与重复密码不一致！';
                        else msg += wpattern[i] + '格式错误!';
                    }
                    
                }else if(r_flag){
					var flag=true;
					var buffer = "";
					for(var i=0;i<repeat_arr.length;i++){
						switch(repeat_arr[i]){
						case '1': buffer = "用户名";break;
						case '2': buffer = "学号";break;
						case '3': buffer = "电话号码";break;
						case '4': buffer = "邮箱";
					}
					if(buffer!==""){
						msg += buffer + "已被使用!";
						flag=false;
					}		
					buffer = "";
					}
					if(flag)window.location.href = "http://localhost:8000/?username=" + vname;
				}else{
                    window.location.href = "http://localhost:8000/?username=" + vname;
                }
				if(wrong||r_flag){
					$("#warning").html("<p id='msg'>" + msg + "</p>\n");
                    $("#warning").css('opacity', 1);
				}
            }
        )
}
