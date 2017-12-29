import Game from "./core/index"

let { Sprite, Scene } = Game

let ctx = canvas.getContext("2d");
const WIDTH = window.screen.availWidth,
    HEIGHT = window.screen.availHeight;

let game = {
    init() {
        // todo 根据场景设置内部元素的管理
        this.scene = new Scene(ctx)

        this.initBackground()

        this.initHour()
        this.initMinute()
        this.initSecond()

        this.scene.render().then(res=>{
            console.log(this.bg)
        });
    },
    initBackground() {
        let bg = new Sprite("assets/background.jpg", WIDTH, true, WIDTH/2, HEIGHT/2);
        bg.zIndex = 1;
        bg.anchor = [0.5, 0.5];

        bg.appendTo(this.scene);
        this.bg = bg
    },

    initHour() {
        let hour = new Sprite("assets/hour.png", 30, true, WIDTH/2, HEIGHT/2);
        hour.zIndex = 2;
        hour.anchor = [0.5, 0.5];

        hour.appendTo(this.scene);
    },
    initMinute() {
    },
    initSecond() {
    }
}


game.init();



