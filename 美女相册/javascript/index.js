var ul = document.getElementById("thumbnails");
var anchors = ul.getElementsByTagName("a");

var previewsPicture = document.getElementById("picture-preview");

var previewBox = document.querySelector(".preview");
var maskBox = document.querySelector(".mask");
var zoomBox = document.querySelector(".zoom");
var zoomPic = document.querySelector("#picture-zoom");
var mainBox = document.querySelector(".main");

for (var i = 0; i < anchors.length; i++) {
  anchors[i].onclick = function () {
    previewsPicture.src = this.href;
    zoomPic.src = this.href;
    return false;
  };
}

previewBox.onmousemove = function (e) {
  var x = e.pageX - mainBox.offsetLeft - maskBox.offsetWidth / 2;
  var y = e.pageY - mainBox.offsetTop - maskBox.offsetHeight / 2;

  var maxX = previewBox.offsetWidth - maskBox.offsetWidth;
  var maxY = previewBox.offsetHeight - maskBox.offsetHeight;
  x = Math.min(Math.max(0, x), maxX);
  y = Math.min(Math.max(0, y), maxY);

  maskBox.style.left = x + "px";
  maskBox.style.top = y + "px";
  zoomPic.style.left =
    (-x / maxX) * (zoomPic.offsetWidth - zoomBox.offsetWidth) + "px";
  zoomPic.style.top =
    (-y / maxY) * (zoomPic.offsetHeight - zoomBox.offsetHeight) + "px";
};

previewBox.onmouseover = function () {
  maskBox.style.display = "block";
  zoomBox.style.display = "block";
};

previewBox.onmouseout = function () {
  maskBox.style.display = "none";
  zoomBox.style.display = "none";
};
