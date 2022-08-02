// 希望 Player 是特殊的类
class Player extends GameImage {
    constructor(game) {
        // player 写死，调用的时候就不再需要 player 了
        super(game, 'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
        this.alive = true
    }
    // 发射子弹的冷却时间
    update() {
        // 动态调整速度，放到一个配置文件里面（加一个 config 类）
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }

        this.inTheArea(this.texture.w, this.texture.h)
        if (!this.alive) {
            this.x = -500
            this.y = -500
        }
    }
    inTheArea(w, h) {
        let viewW = this.game.canvas.width
        let viewH = this.game.canvas.height
        let maxX = viewW - w
        let maxY = viewH - h
        this.x < 0 ? this.x = 0 : ''
        this.y < 0 ? this.y = 0 : ''
        this.x > maxX ? this.x = maxX : ''
        this.y > maxY ? this.y = maxY : ''
    }
    // 发射子弹，即把子弹加入到场景中
    fire() {
        if (this.cooldown === 0) {
            this.cooldown = config.fire_cooldown
            var b = Bullet.new(this.game)
            var bw2 = b.texture.w / 2
            var bh2 = b.texture.h / 2
            var x = this.x + this.texture.w / 2 - bw2
            var y = this.y - this.texture.h / 2 + bh2
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }
}