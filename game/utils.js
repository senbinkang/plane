var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var aInb = function(x, x1, x2) {
    return x >= x1 && x <= x2
}

// 碰撞检测函数
var isImpact = function (a, b) {
    if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
        if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
            return true
        }
    }
    return false
}

// 创建随机函数
const randomBetween = function (start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)
}