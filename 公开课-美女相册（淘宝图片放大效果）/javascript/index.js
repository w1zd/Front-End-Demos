// 1. 基本的页面结构编写 ✅
// 2. 实现点击小图切换大图的效果 ✅
// 3. 蓝色小盒子跟随鼠标移动的效果✅
// 4. 实现右边盒子图片的放大效果✅

var previewImg = document.getElementById("picture-preview");
var previewBox = document.querySelector(".preview");
var maskBox = document.querySelector(".mask");

var mainBox = document.querySelector(".main");

var ul = document.querySelector("#thumbnails");
// 获取所有的小图a标签
var thumbnails = ul.getElementsByTagName("a");
var zoomPic = document.querySelector("#picture-zoom")
var zoom = document.querySelector(".zoom");

for (var i = 0; i < thumbnails.length; i++) {
  // console.log(thumbnails[i]);
  // 给所有的a标签注册点击事件
  thumbnails[i].onclick = function () {
    // 得把preview里面的img标签的src属性
    // 改成当前a标签里的href属性的值
    // console.log(this.href)
    previewImg.src = this.href;
    zoomPic.src = this.href;
    return false;
  };
}

previewBox.onmousemove = function (e) {
  // 需要让蓝色的小盒子maskBox 跟随鼠标移动
  // console.log(1);
  // mask的left值 = 鼠标的x值 - previewBox的left值 - 1/2 maskbox的宽度
  // mask的top值 = 鼠标的y值 - previewBox的top值 - 1/2 maskbox的高

  // console.log(e.pageX, e.pageY);
  // console.log(previewBox.offsetLeft, previewBox.offsetTop);
  // console.log(maskBox.offsetWidth, maskBox.offsetHeight);

  var maskLeft = e.pageX - mainBox.offsetLeft - maskBox.offsetWidth / 2;
  var maskTop = e.pageY - mainBox.offsetTop - maskBox.offsetHeight / 2;

  // 我们需要限制一下 maskBox的left和top值 不能让他超出外面的previewBox
  // left的最小值是 0 left的最大值是 previewBox的宽 - maskBox的宽
  // top的最小值是 0  top的最大值是 previewBox的高 - maskBox的高
  maskLeft = maskLeft < 0 ? 0 : maskLeft;
  maskLeft = maskLeft > mainBox.offsetWidth - maskBox.offsetWidth ? mainBox.offsetWidth - maskBox.offsetWidth : maskLeft;

  maskTop = maskTop < 0 ? 0 : maskTop;
  maskTop = maskTop > mainBox.offsetHeight - maskBox.offsetHeight ? mainBox.offsetHeight - maskBox.offsetHeight : maskTop;

  // var maxLeft = previewBox.offsetWidth - maskBox.offsetWidth 
  // var maxTop = previewBox.offsetHeight - maskBox.offsetHeight

  // maskLeft = Math.min(Math.max(0, maskLeft), maxLeft);
  // maskTop = Math.min(Math.max(0, maskTop), maxTop);



  // 给maskbox设置left和top值 让他移动到鼠标所在的位置
  maskBox.style.left = maskLeft + "px";
  maskBox.style.top = maskTop + "px";


  // 还得给放大的图片设置left和top值，让他和小蓝盒子显示的位置对应起来
  // zoomPIc 的 left值 = （maskBox的left /  mainBox的宽度） * zoomPic的宽度
  // zoomPIc 的 Top值 = （maskBox的top / mainbox的高度）* zoomPic的高度

  var zoomPicLeft = -(maskLeft / mainBox.offsetWidth) * zoomPic.offsetWidth;
  var zoomPicTop = -(maskTop / mainBox.offsetHeight) * zoomPic.offsetHeight;


  zoomPic.style.left = zoomPicLeft + "px";
  zoomPic.style.top = zoomPicTop + "px";
};

mainBox.onmouseover = function(){
  maskBox.style.display = "block";
  zoom.style.display = "block";
}

mainBox.onmouseout = function(){
  maskBox.style.display = "none";
  zoom.style.display = "none";
}