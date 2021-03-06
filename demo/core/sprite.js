// 精灵类
// 每个元素都可以看做是精灵


export default class Sprite {
    constructor(imgSrc = '', width = 0, height = 0, x = 0, y = 0) {
        this.img = new Image()
        this.img.src = imgSrc

        this.width = width

        this.height = height

        this.x = x
        this.y = y

        // 锚点
        this.anchor = [0, 0];

        // 精灵的层级
        this.zIndex = 0;

        // 图像是否加载完成
        this._isLoad = false;
        this._isAdjust = false;

        // 角度
        this.angle = 0;
    }

    // 加载完毕
    loadEnd() {
        return new Promise((reslove, reject)=>{
            if(this._isLoad){
                reslove(this);
            }else {
                this.img.onload = () => {
                    this._isLoad = true;
                    reslove(this);
                }
            }

        })

    }

    // 绘制前调整尺寸
    adjust(){
        let sprite = this;

        if(!this._isAdjust){
            let img = sprite.img;

            // 图片比例适应
            if (typeof sprite.height === 'boolean') {
                let radio = img.width / img.height;
                sprite.height = sprite.width / radio;
            }

            // 根据锚点调整位置
            let anchor = sprite.anchor;
            sprite.x -= sprite.width * anchor[0];
            sprite.y -= sprite.height * anchor[1];

            this._isAdjust = true;
        }

        return sprite
    }

    // 添加节点
    appendTo(scene) {
        scene.addChild(this);
    }

    render(ctx){
        let sprite = this;

        ctx.save();
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
        let rad = sprite.angle/180 * Math.PI
        ctx.rotate(rad);

        ctx.translate(-originX, -originY);
        ctx.drawImage(
            sprite.img,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height
        )

        ctx.restore()
    }
}
