import Game from "./core/index"

let {Sprite, Scene} = Game


const WIDTH = window.screen.availWidth,
    HEIGHT = window.screen.availHeight;

const ANGLE = 6

let game = {
    init() {
        this.scene = new Scene(canvas)

        this.initBackground()
        this.initHour()
        this.initMinute()
        this.initSecond()

        // 初始化日期
        this.initTime();

        // 开始绘制
        this.scene.start().then(res => {
            setInterval(() => {
                this.main();
            }, 1000)
        })
    },
    main() {
        this.update()
        this.render()
        // window.requestAnimationFrame(this.main);
    },
    initTime() {
        let now = new Date();
        let h = now.getHours(),
            m = now.getMinutes(),
            s = now.getSeconds();

        h = h < 12 ? h : h - 12;

        let second = this.second,
            minute = this.minute,
            hour = this.hour

        hour.angle = h * 360 / 12;
        minute.angle = m * ANGLE;
        second.angle = s * ANGLE;
    },
    render() {
        this.scene.render()
    },
    update() {
        let second = this.second,
            minute = this.minute,
            hour = this.hour

        second.angle += ANGLE

        // 秒针转满一圈
        if (second.angle === 360) {
            minute.angle += ANGLE
            second.angle = 0

            // 分针转满一圈
            if (minute.angle === 360) {
                hour.angle += ANGLE
                minute.angle = 0
            }
        }
    },
    initBackground() {
        let bg = new Sprite("assets/background.jpg", WIDTH, true, WIDTH / 2, HEIGHT / 2);
        bg.zIndex = 1;
        bg.anchor = [0.5, 0.5];

        bg.appendTo(this.scene);
        this.bg = bg
    },

    initHour() {
        let hour = new Sprite("assets/hour.png", 30, true, WIDTH / 2, HEIGHT / 2);
        hour.zIndex = 2;
        hour.anchor = [0.5, 0.87];

        hour.appendTo(this.scene);

        this.hour = hour;
    },
    initMinute() {
        let minute = new Sprite("assets/minute.png", 30, true, WIDTH / 2, HEIGHT / 2);
        minute.zIndex = 2;
        minute.anchor = [0.5, 0.92];

        minute.appendTo(this.scene);

        this.minute = minute;
    },
    initSecond() {
        let second = new Sprite("assets/minute.png", 30, true, WIDTH / 2, HEIGHT / 2);
        second.zIndex = 2;
        second.anchor = [0.5, 0.93];

        second.angle = 90;
        second.appendTo(this.scene);

        this.second = second;
    }
}


game.init();



