class GameScene {
    constructor(game) {
        this.game = game
        this.debugModeEnabled = false
        this.elements = []
        this.draw()
    }
    static new(game) {
        // 此处 this 指的是 调用的这个类
        // 我们是用 SceneTitle 调用的这个类
        // 所以 this 就是 SceneTitle
        return new this(game)
    }
    addElement(img) {
        img.scene = this
        this.elements.push(img)
    }
    draw() {
        for (var e of this.elements) {
            // 画粒子效果，让元素自己 draw
            e.draw()
        }
    }
    update() {
        if (this.debugModeEnabled) {
            for(var i = 0; i < this.elements.length; i++) {
                var e = this.elements[i]
                e.debug && e.debug()
            }
        }
        for(var j = 0; j < this.elements.length; j++) {
            var e2 = this.elements[j]
            e2.update()
        }
    }
}