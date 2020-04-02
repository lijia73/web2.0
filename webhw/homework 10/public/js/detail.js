window.onload = function(){
    $('#jump3').click(exit);
    $('#warning_de').click(op_change);
}

function exit(){
    $.post('/logout', function(status, data){
        window.location.href = 'http://localhost:8000/';
    });
}

function op_change(){
    $('#warning_de').css('opacity', 0);
}
