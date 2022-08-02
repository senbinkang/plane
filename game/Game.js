class Game {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback

        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')

        const self = this
        window.addEventListener('keydown', (event) => {
            this.keydowns[event.key] = true
        })
        window.addEventListener('keyup', function (event) {
            self.keydowns[event.key] = false
        })
        this.init()
    }
    // 静态函数初始化
    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        // img 是一个 GameImage
        this.context.drawImage(img.texture.image, img.x, img.y)
    }
    registerAction(key, callback) {
        // 这里面的事件，都在 setInterval 的时候去调用
        this.actions[key] = callback
    }
    // update
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    runloop() {
        var g = this
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            // 如果这个键被按下了，执行里面的函数（调用注册的 action）
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }

        // update
        g.update()
        // clear
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        // draw
        g.draw()

        // next run loop
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }
    textureByName(name) {
        var g = this
        var img = g.images[name]
        return {
            w: img.width,
            h: img.height,
            image: img,
        }
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function () {
            g.runloop()
        }, 1000 / window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    __start() {
        this.runCallback(this)
    }

    init() {
        var g = this
        // 座位标识
        var loads = []

        // 预先载入所有图片（资源加载）
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            // 载入图片
            let name = names[i]
            var path = g.images[name]
            let img = new Image()
            img.src = path
            img.onload = function () {
                // 存入 g.images 中
                g.images[name] = img
                // 所有图片都成功载入之后，调用 run
                loads.push(1)
                if (loads.length === names.length) {
                    g.__start()
                }
            }
        }
    }
}