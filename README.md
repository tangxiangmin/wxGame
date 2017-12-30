微信小游戏探索之路
=== 

## 整理
根据以往的开发经验，参考Phaser和Cocos，整合一个微信小游戏的开发框架，希望这个框架能够兼容浏览器~

[开发文档](./doc.md)传送门。

### 图片的异步加载与场景的生命周期
我们知道`new Image()`是一个异步的过程，而`ctx.drawImage`是需要在图片加载完成之后进行的，另外多个图片的加载顺序不一定，而在开发中需要保证图片绘制的层级关系，这可以通过Promise实现。

随着而来的另外一个问题是场景的绘制必须在所有图片加载完成之后再进行，采用Promise显得并没有那么优雅，链式调用也不符合常规的开发思路，此时通过配置生命周期的钩子函数是一个更明智的做法。这也是Cocos和Phaser采用的方式，大概也是游戏场景生命周期的由来。

### 减少不必要的绘制
由于每帧的时间是有限的，如果每次更新只重绘必要的精灵，应该可以节省不少资源。
> 对于**必要重绘的精灵**，我目前的理解是：绘制属性有变化，且影响层级的精灵

是不是可以像Vue那样，通过属性劫持来观察属性变化的精灵呢？这个思路貌似还不错~

## 关于微信小游戏的思考
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

