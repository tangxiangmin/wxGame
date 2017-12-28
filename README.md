微信小游戏探索之路
=== 

## 整理
根据以往的开发经验，参考Phaser和Cocos，整合一个微信小游戏的开发框架，[文档](./doc.md)

## 思考
`web-adapter`暴露了一些DOM、BOM的全局接口，可以使用`document`、`window`等全局对象，但是与真实的浏览器还是有区别，移植旧代码比较蛋疼。我试了下`Phaser`和`CocosJS`直接引入均无法正常运行。

```js
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

这是一件很尴尬的事情：如果引入`web-adapter`之后，后续的开发是必须依赖其进行的；而不引入`web-adapter`，开发成本无疑会增大。大概一个月以内就会有相应的框架出来~

