var username = /^[a-zA-Z][a-zA-z0-9\_]{5,17}/;
var id = /^[1-9][0-9]{7}$/;
var phone = /^[1-9][0-9]{10}$/;
var mail = /^[a-zA-Z0-9\_\-]+@(([a-zA-Z0-9\_\-])+\.)+[a-zA-Z]{2,4}$/;

window.onload = function(){
    $('#reset').click(reset);
    $('#submit').click(check_submit_valid);
    $('#re_index').click(function(){
        window.location.href = "http://localhost:8000/ ";
    });
    set_tips($('#name'), 'name', "用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
    set_tips($('#id'), 'id', "学号8位数字，不能以0开头");
    set_tips($('#phone'), 'phone', "电话11位数字，不能以0开头");
    set_tips($('#mail'), 'mail', "邮箱形式错误");
}


function reset(){
    $("#warning").children().remove();
    $("#warning").css('opacity', 0);
    $('#name').val("");
    $('#id').val("");
    $('#phone').val("");
    $('#mail').val("");
    $('p').text("");
}

function wrong_pattern(){
    var result = [];
    var name_ = $('#name').val(), id_ = $('#id').val(), phone_ = $('#phone').val(), mail_ = $('#mail').val();
    if(!username.test(name_)) result.push('用户名');
    if(!id.test(id_)) result.push('学号');
    if(!phone.test(phone_)) result.push('电话号码');
    if(!mail.test(mail_)) result.push('邮箱');
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
    var vname = $('#name').val(), vid = $('#id').val(), vphone = $('#phone').val(), vmail = $('#mail').val();
    var wpattern = wrong_pattern(), len = wpattern.length, wrong = len===0?0:1;
    var repeat_arr = "", r_flag = false;
    $.post('/', {'name': vname, 'id': vid, 'phone': vphone, 'mail': vmail, 'flag': wrong})
        .done(
            function(status, data){
                var msg = "注册失败!";
                if(wrong){
                    for(var i=0;i<len;i++){
                        msg += wpattern[i] + '格式错误!';
                    }
                    $("#warning").html("<p id='msg'>" + msg + "</p>");
                    $("#warning").css('opacity', 1);
                }else{
                    window.location.href = "http://localhost:8000/?username=" + vname;
                }
            }
        )
        .fail(
        function(data, status){
            repeat_arr = data.responseText;
			console.log(data.responseText+" repeat");
            var buffer = "";
            var msg = "注册失败!";
            if(wrong){
                for(var i=0;i<len;i++){
                    msg += wpattern[i] + '格式错误!';
                }
                $("#warning").html("<p id='msg'>" + msg + "</p>");
                $("#warning").css('opacity', 1);
            }else{
            for(var i=0;i<repeat_arr.length;i++){
                switch(repeat_arr[i]){
                    case '1': buffer = "用户名";break;
                    case '2': buffer = "学号";break;
                    case '3': buffer = "电话号码";break;
                    default: buffer = "邮箱";
                }
                msg += buffer + "已被使用!";
            }
        }
			$("#warning").html("<p id='msg'>" + msg + "</p>\n");
            $("#warning").css('opacity', 1);         
        });
}
