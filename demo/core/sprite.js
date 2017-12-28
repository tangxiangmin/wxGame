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
    }

    onload(cb) {
        this.img.onload = () => {
            this._isLoad = true;
            cb(this)
        }
    }


    // 添加节点
    // todo Scene代理
    appendTo(ctx) {
        let draw = () => {

            let img = this.img;
            if (typeof this.height === 'boolean') {
                let radio = img.width / img.height;
                this.height = this.width / radio;
            }

            ctx.drawImage(
                img,
                this.x,
                this.y,
                this.width,
                this.height
            )
        };

        this._isLoad ? draw() : this.onload(draw)
    }
}
