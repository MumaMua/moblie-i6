// JavaScript Document
/* 
setInterval()方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
900毫秒到底是多少秒呢
这个模块我很喜欢
*/
setInterval('autoBanner()', 2000);//设置每张图片出来的时间，这个参数很重要

addLoadEvent(addBtn);//加载按钮

addLoadEvent(iBanner);//加载图片
/*
	这个函数返回某个标签的ID，就是选择某个标签，选择的目的是为了更好的操作他
	函数1:对元素进行选择，并以对象的形式返回，类似于jquery
*/
function $1(id) { 
return document.getElementById(id);
}
/*
如果先前已近有了一个window.onload=function(){};
在这样定义就会覆盖掉原来的，所以addLoadEvent做个判断,
如果已经定义过则加进去一个，没有定义则重新定义一个


window.load=aa() 相当于在网页<body>标签中的 onload=aa().
即控制函数aa()在网页加载完毕后执行而不需要通过按钮或其它动作
（如在按钮上的onclick事件）来执行
 函数2:很重要的函数，启动就是调用的这个函数 加载函数
       addLoadEvent(addBtn);//加载按钮 传递的是函数名
       addLoadEvent(iBanner);//加载图片 传递的是函数名
*/
function addLoadEvent(func){
	var oldonload = window.onload;//加载函数 onload 事件会在页面或图像加载完成后立即发生。
	if (typeof window.onload != 'function') {
		//如果加载的不是函数立即重新加载函数
		window.onload = func;
	} else {
	//网页加载结束后，直接执行以下函数
	window.onload = function()//???很奇怪的是语法
	{
	oldonload();
	func();
	}
}
}


/*
	
	函数3:设置切换数字的

*/
function addBtn() {
if(!$1('ibanner')||!$1('ibanner_pic')) return;//检查者两个块是否存在，如果不存在，终止程序

var picList = $1('ibanner_pic').getElementsByTagName('a');//获得标签a对象列表,便于进行控制

if(picList.length==0) return;//若果图片长度是0，则直接返回 程序终结
var btnBox = document.createElement('div');//获得层标签，便于控制 (其实层已经变成了对象了)向html增加一个div块
/*我们经常需要在JavaScript中给Element动态添加各种属性，这可以通过使用setAttribute()来实现，
这就涉及到了浏览器的兼容性问题。
setAttribute(string name, string value)：增加一个指定名称和值的新属性，
或者把一个现有的属性设定为指定的值。
*/
btnBox.setAttribute('id','ibanner_btn');//增加了一个按钮，给刚才增加的块增加一个id属性便于后边css控制

var SpanBox ='';//定义一个空字符串
//这个for循环实现了图片右下方的数字序列 normal现实了定义一个类进行美化
for(var i=1; i<=picList.length; i++ ) {
var spanList = '<span class="normal">'+i+'</span>';
SpanBox += spanList;//全部放到空串中进行拼接
}
//nerHTML 属性可设置或返回单元格的开始标签和结束标签之间的 HTML
btnBox.innerHTML = SpanBox;//数字标签设置成功  
//调用函数$1,
$1('ibanner').appendChild(btnBox);//appendChild() 方法在指定元素节点的最后一个子节点之后添加节点。
//ibanner_btn创建成功 然后获得第一个链接的图片 ，然后设置为当前
$1('ibanner_btn').getElementsByTagName('span')[0].className = 'current';
//然后设置给每张图片设置一个id属性
for (var m=0; m<picList.length; m++){
var attributeValue = 'picLi_'+m
picList[m].setAttribute('id',attributeValue);//setAttribute() 方法创建或改变某个新属性
//给每个图片设置了一个id属性
}
}


 /*
 	功能:实现图片的移动
	elementID 图片的id属性
	final_x:图片移动的x轴
	final_y:图片移动的y轴
	interval:代表移动速度
	函数4:实现移动功能
 
 */
function moveElement(elementID,final_x,final_y,interval) {
/*
getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用。
getElementById() 方法查找具有指定的唯一 ID 的元素。
表示具有指定的 id 属性的文档元素的 Element 节点。如果没有找到这样的元素，则返回 null
*/
//if (!document.getElementById) return false;//没有获得id直接退出 这一句很有问题
if (!document.getElementById(elementID)) return false;//没有获得id直接退出
var elem = document.getElementById(elementID);//生成操作的对象
if (elem.movement) {//对象.属性  ????
/*learTimeout() 方法可取消由 setTimeout() 
方法设置的 timeout。由 setTimeout() 返回的 ID 值。
该值标识要取消的延迟执行代码块。为什么要取消，不知道,而且这个写法好像有问题*/
clearTimeout(elem.movement);//调用方法 移动对象
}
//设置图片首次的出现方式
if (!elem.style.left) {
elem.style.left = "0px";
}
if (!elem.style.top) {
elem.style.top = "0px";
}
//格式化一个整数位置，并初始化到两个变量中 parseInt() 函数可解析一个字符串，并返回一个整数。
var xpos = parseInt(elem.style.left);
var ypos = parseInt(elem.style.top);

if (xpos == final_x && ypos == final_y) {
moveing = false;
return true;
}

if (xpos > final_x) {
var dist = Math.ceil((xpos - final_x)/10);
xpos = xpos - dist;
}
if (ypos < final_y) {
var dist = Math.ceil((final_y - ypos)/10);
ypos = ypos + dist;
}
if (ypos > final_y) {
var dist = Math.ceil((ypos - final_y)/10);
ypos = ypos - dist;
}
elem.style.left = xpos + "px";
elem.style.top = ypos + "px";
            //自己调用自己,通过递归实现无限次循环自己调用自己的滑动效果
var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
//setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。
elem.movement = setTimeout(repeat,interval);
//repeat 必需。要调用的函数后要执行的 JavaScript 代码串。
//interval必需。在执行代码前需等待的毫秒数。
}

/*
	普通属性
	设置按钮的
	让按钮逐个变幻
	取消的话，图片再也不动弹
	函数5:设置切换数字的外观样式
	
*/
function classNormal() {
var btnList = $1('ibanner_btn').getElementsByTagName('span');
for (var i=0; i<btnList.length; i++){
btnList[i].className='normal';
}
}

/*
	设置连接标签的
	函数6：设置链接图片的
    zIndex：图片出场之后的值  改变元素的堆叠顺序，
*/
function picZ()
{/*

getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
*/
	var picList = $1('ibanner_pic').getElementsByTagName('a');
	for (var i=0; i<picList.length; i++){
	picList[i].style.zIndex='1';
	}
}


var autoKey = false;//定义一个变量，不知何用??

/*
	函数7：设置整体的图片跑动效果
*/
function iBanner() {
//如果不存在，则程序退出
if(!$1('ibanner')||!$1('ibanner_pic')||!$1('ibanner_btn')) return;
//根据鼠标的动作选择执行的JS代码 
$1('ibanner').onmouseover = function(){autoKey = true};
$1('ibanner').onmouseout = function(){autoKey = false};
//生产了两个对象，一个是数字标签,一个是图片
var btnList = $1('ibanner_btn').getElementsByTagName('span');
var picList = $1('ibanner_pic').getElementsByTagName('a');
//如果图片列表不存在，则直接退出
if (picList.length==1) return;
/*zIndex 属性设置元素的堆叠顺序。

该属性设置一个定位元素沿 z 轴的位置，
z 轴定义为垂直延伸到显示区的轴。如果为正数，
则离用户更近，为负数则表示离用户更远。
*/
picList[0].style.zIndex='2';
//设置当前按钮的外观
for (var m=0; m<btnList.length; m++){
		btnList[m].onmouseover = function() {
		for(var n=0; n<btnList.length; n++) {
		if (btnList[n].className == 'current') {
		var currentNum = n;
	}
}


classNormal();//设置切换数字
picZ();//设置切换图片
this.className='current';//设置切换的当前数字的风格外观
picList[currentNum].style.zIndex='2';//当前图片的层叠顺序
var z = this.childNodes[0].nodeValue-1;
picList[z].style.zIndex='3';
if (currentNum!=z){
picList[z].style.left='650px';
moveElement('picLi_'+z,0,0,10);//00是鼠标指向时图片的出现效果，10是表示速度
}
}
}
}
/*
tInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。

setInterval() 方法会不停地调用函数，直到 clearInterval() 被调用或窗口被关闭。
由 setInterval() 返回的 ID 值可用作 clearInterval() 方法的参数。


*/

//图片自动轮播的代码
/*
	函数8：自动轮播效果

*/
function autoBanner() {
	//如果布局层，层中图片，以及下边的按钮不存在，则代码退出
if(!$1('ibanner')||!$1('ibanner_pic')||!$1('ibanner_btn')||autoKey) return;
//生成切换数字对象框
var btnList = $1('ibanner_btn').getElementsByTagName('span');
//生成图片对象 getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
var picList = $1('ibanner_pic').getElementsByTagName('a');
//如果只有一张图片则程序退出
if (picList.length==1) return;
//遍历当前数字切换按钮，把当前切换按钮序号存入currentNum
for(var i=0; i<btnList.length; i++) {
if (btnList[i].className == 'current') {
var currentNum = i;//当前切换的数字序列
}
}
//如果数字序列号刚好等于最后一个图片序列号 
if (currentNum==(picList.length-1) ){//如果为真，说明图片已经播放到最后一张，下边则要开始设置第一张啦
classNormal();//设置切换数字序列
picZ();//设置切换图片序列
btnList[0].className='current';//把第1个设置为当前
//设置图片的叠放次序，即把第一张图片放到最上面
picList[0].style.zIndex='3';//好像这句代码是多余的哦 对第一张的出场效果有点影响
picList[0].style.left='900px';//left改变成top,让学生欣赏一下第一张图片优美的变幻^_^  从下边上来了啊
   //moveElement(elementID,final_x,final_y,interval) 
moveElement('picLi_0',0,0,10);//调用移动的方法，进行移动
	} else {
		//设置下一个啦
	classNormal();//调用函数，设置切换数字
	picZ();//设置切换图片
	var nextNum = currentNum+1;//计算下一个的切换数字
	btnList[nextNum].className='current';//设置切换数字的类名 
	//设置切换的图片 注意这个语法
	picList[currentNum].style.zIndex='2';
	picList[nextNum].style.zIndex='3';//设置z轴的堆叠顺序
	picList[nextNum].style.left='650px';//属性规定元素的左边缘
	//function moveElement(elementID,final_x,final_y,interval)
	moveElement('picLi_'+nextNum,0,0,10)//调用移动函数进行移动; 10代表的是移动的速度
	}
}
// JavaScript Document