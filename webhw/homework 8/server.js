var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');

var server = http.createServer(
    function(req, res){
        var name = querystring.parse(url.parse(req.url).query).username;
        var udename = typeof name==='undefined'?1:0;
        if(udename&&req.url!==''&&req.url!=='/'){
            handle_other_request(res, req.url);
        }else{
            if(udename||!find(name)){
                handle_index(req, res);
            }else if(find(name)){
                redetail(res, name);
				res.end();
            }
        }
    }
).listen(8000);
console.log("Server is listening at 8000");

//在存储的json文件中查找
function find(name){
    var data = fs.readFileSync('./store.json', 'utf-8');
    var result = JSON.parse(data);
    for(var i=0;i<result.length;i++){
        if(result[i].username==name) return true;
    }
    return false;
}

//动态生成index.html界面
function reindex(res){
    fs.readFile('./signup.html', 'utf-8', (err, data) => {
          res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
		  res.write(data);
		  res.end();
     }); 
}

//动态生成detail.html界面
function redetail(res, name){
    var student_id, phone, e_mail;
    var data = fs.readFileSync('./store.json', 'utf-8');
    var result = JSON.parse(data);
    for(var i=0;i<result.length;i++){
        if(result[i].username==name){
            student_id = result[i].id;
            phone = result[i].phone;
            e_mail = result[i].mail;
        }
    }
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<!DOCTYPE HTML>\n<html>\n<head>\n<meta charset="utf-8"/>\n<title>User Information</title>\n');
    res.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js"></script>\n<link rel="stylesheet" type="text/css" href="./style.css" />\n<script src="./client.js"></script>\n</head>\n');
    res.write('<body>\n<h1>用户详情</h1>\n<div class="detail"><span>用户名: </span>' + name + '</div>\n');
    res.write('<div class="detail"><span>学号: </span>' + student_id + '</div>\n');
    res.write('<div class="detail" ><span>电话: </span>' + phone + '</div>\n');
    res.write('<div class="detail"><span>邮箱: </span>' + e_mail + '</div>\n');
    res.write('<div id="btn"><input type="button" id="re_index" value="返回注册界面" /></div>\n');
}

function handle_other_request(response, filepath){
    var path = filepath.substr(1, filepath.length);
    for(var i=0;i<path.length;i++){
        if(path[i]==='.') break;
    }
    var type = path.substr(i+1, path.length);
    if(type==='ico'||type==='jpg'){
        fs.readFile('./'+path, 'binary', function(err, data){
            if(err) throw err;
            if(type==='ico') type = 'x-icon';
            else type = 'x-jpg';
            response.writeHead(200, {'Content-Type':'text/' + type});
            response.end(data, 'binary');
        });
    }else {
        fs.readFile('./'+path, 'utf-8', function(err, data){
            if(err) throw err;
            if(type==='js') response.writeHead(200, {'Content-Type':'text/javascript'});
            else response.writeHead(200, {'Content-Type':'text/' + type});
            response.end(data);
        });
    }
}

function find_repeat(input){
    var result = [], flag = [0, 0, 0, 0];
    var data = fs.readFileSync('./store.json', 'utf-8'), json_obj = JSON.parse(data);
    for(var i=0;i<json_obj.length;i++){
        if(json_obj[i].username===input.name&&!flag[0]) {
            result.push(1);
            flag[0] = 1;
        }
        if(json_obj[i].id===input.id&&!flag[1]) {
            result.push(2);
            flag[1] = 1;
        }
        if(json_obj[i].phone===input.phone&&!flag[2]) {
            result.push(3);
            flag[2] = 1;
        }
        if(json_obj[i].mail===input.mail&&!flag[3]) {
            result.push(4);
            flag[3] = 1;
        }
    }
    return result;
}

function handle_index(req, res){
    var post = "",flag;
	//监听post发送请求
    req.on('data', function(chunk){
        post += chunk;
		if(post.length==0)flag=false;
		else flag=true;
    });
	//数据接收完毕
    req.on('end', function(){
        if(!flag){
            reindex(res);
            return;
        }
		//将字符串转换为对象
        var result = querystring.parse(post);
		var pflag = result.flag;
        var repeat_arr = find_repeat(result);
		var rflag = (repeat_arr.length===0)?0:1;
        pflag = parseInt(pflag);
        if(!rflag&&!pflag){
            var json = {
                username: result.name,
                id: result.id,
                phone: result.phone,
                mail: result.mail
            };
            //将store.json文件内的数据全部读出来，然后重新增加新数据，写入
            var content = fs.readFileSync('./store.json', 'utf-8');
            var json_obj = JSON.parse(content);
            fs.writeFileSync('./store.json', '[\n');
            for(var i=0;i<json_obj.length;i++){
                if(i!==json_obj.length-1) fs.appendFileSync('./store.json', JSON.stringify(json_obj[i])+'\,\n');
                else fs.appendFileSync('./store.json', JSON.stringify(json_obj[i]));
            }
            //若原本存储数据为空，不需要加','
            var temp = "";
            if(json_obj.length!==0){
                temp += '\,\n';
            }
            temp += JSON.stringify(json)+'\n]';
            if(typeof json.username!=='undefined')
                fs.appendFileSync('./store.json', temp);
            else fs.appendFileSync('./store.json', '\n]');
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end();
            }
            else {
                if(rflag) {
                    res.writeHead(400, {'Content-Type':'text/plain'});
                    var str = "";
                    for(var i=0;i<repeat_arr.length;i++) str += repeat_arr[i];
                    res.end(str);
                }else {
                    res.writeHead(200, {'Content-Type':'text/plain'});
                    res.end();
                }
            }
        });
}

