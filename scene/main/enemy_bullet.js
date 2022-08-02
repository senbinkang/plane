// 敌人子弹的类
class EnemyBullet extends GameImage {
    constructor(game) {
        super(game, 'enemy_bullet')
        this.setup()
    }
    setup() {
        this.w = this.texture.w
        this.h = this.texture.h
        // this.speed = 2
        this.speed = config.enemy_bullet_speed
        this.alive = true
        this.isOutOfView = false
    }
    update() {
        // this.speed = config.bullet_speed
        this.y += this.speed
        if (!this.alive) {
            this.x = -200
            this.y = -200
        }

        this.outOfView()
    }
    outOfView() {
        let canvasH = this.game.canvas.height
        if (this.y > canvasH) {
            this.isOutOfView = true
        }
    }
}