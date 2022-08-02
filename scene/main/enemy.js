// 创建敌人
class Enemy extends GameImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'enemy' + type
        // 随机返回一个存在的 type
        super(game, name)
        this.setup(type)
    }
    setup(type) {
        type === 1 ? this.isCanFireType = true : this.isCanFireType = false
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 330)
        this.y = -randomBetween(0, 200)
        this.alive = true
        this.cooldown = 30
    }
    update() {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
        if (!this.alive) {
            this.enemyDie()
        }

        this.fire()
    }
    fire() {
        if (this.isCanFireType && this.y > 0 && this.cooldown > 0) {
            this.cooldown--
        } else if (this.cooldown === 0) {
            this.cooldown = 30
            var b = EnemyBullet.new(this.game)
            var bw2 = b.texture.w / 2
            var bh2 = b.texture.h / 2
            var x = this.x + this.texture.w / 2 - bw2
            var y = this.y - this.texture.h / 2 + bh2
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    enemyDie() {
        this.y = -randomBetween(100, 1000)
        this.x = randomBetween(0, 330)
        this.alive = true
    }
}