import Game from "./core/index"

let { Sprite, Scene } = Game

let ctx = canvas.getContext("2d");
const WIDTH = window.screen.availWidth,
    HEIGHT = window.screen.availHeight;

let game = {
    init() {
        // todo 根据场景设置内部元素的管理
        this.sence = new Scene()

        this.initBackground()

        this.initHour()
        this.initMinute()
        this.initSecond()
    },
    initBackground() {
        let bg = new Sprite("assets/background.jpg", WIDTH, true, 0, 0);
        bg.appendTo(ctx);
    },
    initHour() {
        let hour = new Sprite("assets/hour.png", 30, true, 0, 0);
        hour.appendTo(ctx);
    },
    initMinute() {
    },
    initSecond() {
    }
}


game.init();



