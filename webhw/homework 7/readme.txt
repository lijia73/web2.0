1.Calculator
js LoC
Before:256
After:149
2.Maze
js LoC
Before:73
After:48
3.Whac-a-mole
js LoC
Before:77
After:60
4.Fifteen Puzzle
js LoC
Before:164
After:128
5.Toolkits使用心得
(1)jQuery 选择器 使用方便，有效缩短代码长度，使代码可读性更高
(2)jQuery 事件 $(selector).click(function) 一次设置多个元素，不用再遍历数组中每个元素
(3)jQuery对象有“批量操作”的特点可调用css对象方便修改对象的CSS
e.g.$('#test').css('background-color', 'black').css('color', 'red');
(4)jQuery prop()方法 设置或返回被选元素的属性和值,用于检索属性值(固有属性）
(5)jQuery attr()方法 方法设置或返回被选元素的属性值,用于自定义DOM属性
e.g.1 <a href="#" id="link1" action="delete">删除</a> 前两个属性是固有属性，后面一个属性是自定义的
(6)_.indexOf(array, value, [fromIndex=0])：返回首次 value 在数组array中被找到的 索引值 有效缩短代码

6.Tablesort
//下面的库引入也要粘贴
var importJs=document.createElement('script')
importJs.setAttribute("type","text/javascript")
importJs.setAttribute("src", 'https://cdn.bootcss.com/jquery.tablesorter/2.31.1/js/jquery.tablesorter.js') 
document.getElementsByTagName("head")[0].appendChild(importJs)
神秘代码:$("table").tablesorter();
网站1：http://quote.eastmoney.com/center/boardlist.html#boards2-90.BK0475
右上角银行个股资金流向排行
网站2：http://quote.eastmoney.com/center/futures.html
滑到下面四个表格
网站3：http://stock.eastmoney.com/newstock.html
厉害了，这个网站全是表
