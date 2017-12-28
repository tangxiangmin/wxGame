微信小游戏探索之路
=== 

## 整理
`web-adapter`暴露了一些DOM、BOM的全局接口，可以使用`document`、`window`等全局对象，但是与真实的浏览器还是有区别，移植旧代码比较蛋疼。我试了下`Phaser`和`CocosJS`直接引入均无法正常运行。

``js
let ctx = canvas.getContext("2d");

// 直接访问window
let w = window.screen.availWidth,
    h = window.screen.availHeight;

ctx.fillStyle = "rgba(0,0,0,0.1)";

ctx.fillRect(0, 0, w, h);
```

如果不使用`web-adapter`，可以使用wx相关接口创建canvas对象然后进行相关处理，但是其他一些操作比如获取屏幕宽高会受限。
```js
let canvas = wx.createCanvas();
let ctx = canvas.getContext("2d");

let {windowWidth, windowHeight} = wx.getSystemInfoSync()

ctx.fillStyle = "rgba(0,0,0,0.1)";
ctx.fillRect(0, 0, windowWidth, windowHeight);
```

