// 本案例使用的是本地的假数据
// 声明一个数组来保存评论数据
// 当页面刚一加载的时候，我们就去localStorage中把我们存好的数组读取出来
var comments = localStorage.getItem("comments");

var commentData = comments == null ? [] : JSON.parse(comments);

// 在页面刚加载的时候，把数组中所有的评论数据渲染到页面中去
// 1. 数组中没条数据对应一个 li 标签
// 2. 只需要将数组中的每一个数据 创建一个新的 li 标签放到ul中

function render() {
  var html = "";
  for (var i = 0; i < commentData.length; i++) {
    // commentData[i] 这个就是评论数据
    // id  avatar content
    // 老办法（这次不用）： document.createElement("li");
    html += `
    <li>
      <img src="${commentData[i].avatar}" alt="">
      <p>${commentData[i].content}</p>
      <button onclick="delComment(${commentData[i].id})">X</button>
    </li>
  `;
  }
  // 在拼接好所有的 li html代码之后
  // 将其设置给 ul
  var ul = document.querySelector(".comment-list");
  ul.innerHTML = html;
}

render();

// 实现发表评论的功能
// 1. 先给按钮注册点击事件
var postBtn = document.querySelector("#post-btn");
postBtn.onclick = function () {

  // 2. 获取用户输入
  var commentText = document.querySelector("#comment");
  // 判断文本框中是否有内容，如果没有，就直接return
  if(commentText.value.trim() === ""){
    return;
  }

  // alert(commentText.value);
  // 3. 将用户输入的内容添加到数组中去
  var newComment = {
    // id 是每一个元素的唯一标识 不能重复
    // 我们只需要找到数组的第一个元素，给他的id+1 就是新元素的id
    id:
      commentData.length == 0 ? 1 : commentData[0].id + 1,
    avatar: `./images/avatar${Math.round(Math.random() * 26 + 1)}.jpeg`,
    content: commentText.value,
  };
  commentData.unshift(newComment);

  // 把这个新增了数据之后的数组，给存储到本地存储 localStorage 中去！
  localStorage.setItem("comments", JSON.stringify(commentData));

  // 4. 在数据添加到数组中之后，页面中的元素，是需要根据数组重新进行加载的！
  render();

  // 5. 清理操作
  commentText.value = "";
};

function delComment(id){
  // alert(id);
  // id 就是要删除的元素的id
  // 只需要在数组中找到对应的元素 然后删除，就好了
  var delIndex = -1;
  for(var i = 0; i < commentData.length; i ++){
    if(commentData[i].id == id){
      // 如果当前元素id 和 传进来的id 相同，那就意味着找到了要删除的元素
      // 要删除的元素的索引 index 就是 i
      delIndex = i;
      break;
    }
  }

  // 使用数组的splice 方法 ，根据delIndex 直接删除对应的元素即可
  commentData.splice(delIndex, 1);

  // 把这个删除了数据之后的数组，给存储到本地存储 localStorage 中去！
  localStorage.setItem("comments", JSON.stringify(commentData));

  // 重新调用一下render函数 把删除数据之后的新数组 渲染到页面上去
  render();
}