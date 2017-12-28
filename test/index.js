
let canvas = wx.createCanvas();

let ctx = canvas.getContext("2d");


// let w = window.screen.availWidth,
//     h = window.screen.availHeight;

let {windowWidth, windowHeight} = wx.getSystemInfoSync()

ctx.fillStyle = "rgba(0,0,0,0.1)";

ctx.fillRect(0, 0, windowWidth, windowHeight);



