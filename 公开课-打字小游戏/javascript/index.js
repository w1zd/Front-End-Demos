window.onload = function () {
  // 1. 先获取所有可能用到的DOM对象
  var canvas = document.getElementsByClassName("canvas")[0];
  var cells = canvas.getElementsByClassName("cell");
  var gameScore = document.getElementById("game-score");
  var gameFaildCount = document.getElementById("game-faildcount");
  // 声明两个变量来存储 得分 和 错误分
  var score = 0;
  var faildCount = 0;

  // 声明一个变量，来决定小盒子移动的速度
  var step = 1;

  // 2. 设置定时器，让所有的小盒子能够向下自动移动
  // 帧： 每秒有多少幅图像  60帧是常见的比较流畅的帧率
  // 1秒60帧， 1帧多少毫秒？？
  // 1000 / 60 = 16.7

  // 声明一个变量，用来设置一秒中内产生多少个文字盒子
  var appearSpeed = 2;

  // 声明一个变量，用来记录当前在第几帧
  var count = 1;

  function render() {
    count++;
    count = count % 60;

    // 每隔多少帧产生一个字母 通过下面的公式计算
    // 60 / appearSpeed =  30
    if (count % (60 / appearSpeed) == 0) {
      // 这里需要动态生成文字盒子
      var cell = document.createElement("div");
      cell.className = "cell";
      // 用ascii码的方式生成随机字母 给cell
      cell.innerText = String.fromCharCode(Math.round(Math.random() * 25) + 65);
      // 生成随机颜色交给背景色
      cell.style.backgroundColor = randomColor();
      // 给元素一个随机的left值
      cell.style.left = Math.random() * (canvas.offsetWidth - 40) + "px";
      canvas.appendChild(cell);
    }

    // 要让所有的字母小盒子向下移动
    for (var i = 0; i < cells.length; i++) {
      // 让盒子向下移动
      // 盒子向下移动的时候，需要做边界处理，如果盒子将要跑到大盒子外面了
      // 我们就直接把他销毁掉  当 盒子的top值 >= 大盒子的高度 - 小盒子高度
      var top = cells[i].offsetTop + step;
      if (top >= canvas.offsetHeight - cells[i].offsetHeight) {
        canvas.removeChild(cells[i]);
        // cells[i].remove();
        // 只要元素掉出边界了，那就意味着这个字没打上，所以错误数量要+1
        faildCount++;
        gameFaildCount.innerText = "错误：" + faildCount;
        // 当元素被移除之后，下面的代码就不要让他执行了，直接跳到下一次循环就ok了
        continue;
      }

      cells[i].style.top = cells[i].offsetTop + step + "px";
    }
  }

  

  function randomColor() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);

    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  // 给当前文档注册按键时间，用来玩游戏
  document.onkeydown = function (e) {
    // console.log(String.fromCharCode(e.keyCode));
    // 通过e.keyCode 我们可以知道用户按的是哪个键
    // 知道用户的按键内容之后，我们需要找到和用户按的对应的字母小盒子
    // cells 是一个类数组 伪数组
    // 我们可以借用数组查找元素的方法，找到对应的元素

    // 如果有戏没开始，啥也不干
    if(!isGameStarted) return;

    var target = Array.prototype.find.call(cells, function (v) {
      return v.innerText === String.fromCharCode(e.keyCode);
    });

    if (target) {
      // 找到元素之后，需要将当前元素移除，而且还要给用户加分！
      canvas.removeChild(target);
      score ++;
      gameScore.innerText = "得分: " + score; 

      // 让游戏难度升级： 一个是让速度加快 一个是让生成的内容变多
      if(score % 10 == 0){
        step ++;
        appearSpeed ++;
      }
    } else {
      // target没内容，说明用户按的键，没有对应的字母小盒子，那就是按错了
      faildCount++;
      gameFaildCount.innerText = "错误：" + faildCount;
    }
  };

  // setInterval(render, 16.7);

  var timer;
  var isGameStarted = false;
  document.getElementById("btnStart").onclick = function(){
    clearInterval(timer);
    timer = setInterval(render, 16.7);
    isGameStarted = true;
  }

  document.getElementById("btnPause").onclick = function(){
    clearInterval(timer);
    isGameStarted = false;
  }
};
