window.onload = function(){
    $('#jump1').click(function(){
        window.location.href = "http://localhost:8000/regist ";
    });
    $('#reset').click(reset);
    $('#signin').click(check_signin_valid);
    $('#name').bind("input propertychange change", clear_error_mess);
    $('#pass').bind("input propertychange change", clear_error_mess);
}
function reset(){
    $("#warning").children().remove();
    $("#warning").css('opacity', 0);
    $('#name').val("");
    $('#pass').val("");
}

function check_signin_valid(){
    var vname = $('#name').val(), vpass = $('#pass').val();
    var error_flag = "", r_flag = false;
    $.post('/', {'name': vname, 'pass': vpass})
    .done(
        function(data, status){
            error_flag = data;
            if(error_flag=="0"){
                $("#warning").children().remove();
                $("#warning").append("<p id='msg'>错误的用户名</p>\n");
                $("#warning").css('opacity', 1);
            }else if(error_flag=="1"){
                $("#warning").children().remove();
                $("#warning").append("<p id='msg'>错误的密码</p>\n");
                $("#warning").css('opacity', 1);
            }else if(error_flag=="2"){
                window.location.href = 'http://localhost:8000/?username='+vname;
            }
        }
    )
}

function clear_error_mess(){
    $("#warning").children().remove();
    $("#warning").css('opacity', 0);
}