

## Sprite
抽象游戏对象，精灵的属性决定了其绘制在画布上的位置和形状

* zIndex，决定scene上精灵的渲染顺序，数值越大在上
* anchor，精灵的锚点
* angle，角度
* width，宽
* height，高

## Scene
场景用于管理多个精灵，负责渲染顺序和画布更新，可以看做是ctx的一个代理。
Cocos在场景上还有Layer层的概念。

### todo
* 获取场景精灵的引用
* 场景生命周期管理游戏流程（可参考Phaser）
