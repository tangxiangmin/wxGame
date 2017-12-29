
// 游戏场景类
export default class Scene {
    constructor(ctx){
        this.ctx = ctx;

        this.children = [];
    }

    addChild(sprite){
        this.children.push(sprite);
    }

    render(){
        // this.children = this.children.sort((a, b)=>{
        //     return a.zIndex - b.zIndex;
        // });

        // todo 保证图片加载完成后再进行渲染
        // todo 根据anchor设置实际的x和y
        let tasks = [];
        this.children.forEach(sprite=>{
            tasks.push(sprite.loadEnd())
        })

        let ctx = this.ctx;

        return Promise.all(tasks).then(sprites=>{
            // 通过层级决定渲染顺序
            sprites.sort((a,b)=>{
                return a.zIndex - b.zIndex;
            }).forEach(sprite=>{

                sprite.adjust();

                this.ctx.drawImage(
                    sprite.img,
                    sprite.x,
                    sprite.y,
                    sprite.width,
                    sprite.height
                )
            })
        })



    }
}