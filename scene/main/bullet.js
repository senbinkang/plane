// 子弹的类
class Bullet extends GameImage {
    constructor(game, bType = 'bullet') {
        super(game, bType)
        this.type = bType
        this.setup()
    }
    setup() {
        this.w = this.texture.w
        this.h = this.texture.h
        // this.speed = 2
        this.speed = config.bullet_speed
        this.alive = true
        this.isOutOfView = false
    }
    update() {
        // this.speed = config.bullet_speed
        this.y -= this.speed
        if (!this.alive) {
            this.x = -200
            this.y = -200
        }

        this.isOutView()
    }
    isOutView() {
        if (this.y + this.h < -10) {
            this.isOutOfView = true
        }
    }
}