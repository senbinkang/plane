var loadLevel = function (game, n) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        // 将 p 传入
        var b = Block(game, p)
        // 设置 block 坐标
        blocks.push(b)
    }
    return blocks
}

// var blocks = []
var enableDebugMode = function (game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function (event) {
        var k = event.key
        if (event.key === 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡
            // blocks = loadLevel(game, Number(k))
        }
    })

    // 控制小球速度
    document.querySelector('#id-input-speed').addEventListener('input', function (event) {
        var value = Number(event.target.value)
        if (value === 0) {
            value = 1
        }
        window.fps = value
    })
}

var __main = function () {
    // 定义 images 对象
    var images = {
        bullet: 'img/bullet.png',
        cloud: 'img/cloud.png',
        player: 'img/player.png',
        sky: 'img/sky.png',
        enemy0: 'img/enemy0.png',
        enemy1: 'img/enemy1.png',
        enemy2: 'img/enemy2.png',
        enemy_bullet: 'img/enemy_bullet.png',
        spark: 'img/spark.png',
        spark_blue: 'img/spark_blue.png',
        start_scene: 'img/start_scene.png',
        end_scene: 'img/end_scene.png',
    }

    // 希望在 game 完全初始化（图片都载入进来之后）之后，
    // 再去调用回调
    var game = Game.instance(30, images, function (g) {
        // var scene = GameScene.new(g)
        var scene = SceneTitle.new(g)
        // var scene = SceneEnd.new(g)
        g.runWithScene(scene)
    })

    // 将 debug 相关的写到一起
    enableDebugMode(game, true)
}

__main()