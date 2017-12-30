// 游戏场景类
export default class Scene {
    constructor(ctx) {
        this.ctx = ctx;

        this.children = [];

        this._loadAll = false;
    }

    addChild(sprite) {
        this.children.push(sprite);
    }

    queen() {
        let tasks = [];
        this.children.forEach(sprite => {
            tasks.push(sprite.loadEnd())
        })

        let ctx = this.ctx;

        return Promise.all(tasks).then(sprites => {
            this._loadAll = true;
            // 通过层级决定渲染顺序
            sprites.sort((a, b) => {
                return a.zIndex - b.zIndex;
            })

            this.children = sprites;
            this.render()
        })
    }

    render(){
        if (!this._loadAll) {
            return
        }

        this.children.forEach(sprite => {
            // 图片比例
            sprite.adjust();

            let x = sprite.x,
                y = sprite.y,
                w = sprite.width,
                h = sprite.height;


            let anchor = sprite.anchor;
            // 根据锚点计算形变中心
            let originX = x + w * anchor[0],
                originY = y + h * anchor[1];

            ctx.translate(originX, originY);
            ctx.rotate(sprite.angle);
            ctx.translate(-originX, -originY);

            this.ctx.drawImage(
                sprite.img,
                sprite.x,
                sprite.y,
                sprite.width,
                sprite.height
            )
        })
    }

    // 游戏更新
    update(cb) {
        cb();
        window.requestAnimationFrame(this.update.bind(this, cb));
    }
}