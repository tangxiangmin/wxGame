// 游戏场景类
export default class Scene {
    constructor(canvas, opt) {
        let ctx = canvas.getContext("2d");

        this.canvas = canvas;
        this.ctx = ctx;


        this.children = [];
        this._loadAll = false;

        this.initSize();
        this.mergeOptions(opt)

        this.onEnter()
    }
    //===== lifecycle ====//
    onEnter(){}
    onExit(){}

    //===== init ====//
    initSize(){
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    mergeOptions(opt){
        Object.keys(opt).forEach(key=>{
            this[key] = opt[key].bind(this);
        })
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
            // drawImage sorted by zIndex
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
}