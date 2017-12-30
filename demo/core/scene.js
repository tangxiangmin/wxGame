// 游戏场景类
export default class Scene {
    constructor(canvas) {
        let ctx = canvas.getContext("2d");

        this.canvas = canvas;
        this.ctx = ctx;



        this.children = [];
        this._loadAll = false;

        this.initSize();
    }
    //===== init ====//
    initSize(){
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    //===== api ====//

    addChild(sprite) {
        this.children.push(sprite);
    }

    start() {
        let tasks = [];
        this.children.forEach(sprite => {
            tasks.push(sprite.loadEnd())
        })

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

        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height)

        this.children.forEach((sprite) => {
            sprite.render(ctx)
        })
    }

    // 游戏更新
    update(cb) {
        cb();
        window.requestAnimationFrame(this.update.bind(this, cb));
    }
}