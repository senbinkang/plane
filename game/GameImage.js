class GameImage {
    constructor(game, name) {
        this.game = game
        this.texture = game.textureByName(name)
        this.x = 0
        this.y = 0
        this.w = this.texture.width
        this.h = this.texture.height
    }
    static new(game, name) {
        // 此处 this 指的是 调用的这个类
        // 我们是用 SceneTitle 调用的这个类
        // 所以 this 就是 SceneTitle
        return new this(game, name)
    }
    draw() {
        this.game.drawImage(this)
    }
    update() {

    }
}