// 创建一个 cloud 的类
class Cloud extends GameImage {
    constructor(game) {
        super(game, 'cloud')
        this.setup()
    }
    setup() {
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.debug()
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}