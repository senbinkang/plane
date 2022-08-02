class Particle extends GameImage {
    constructor(game, name = 'spark'){
        super(game, name)
        this.setup()
    }
    setup() {
        // 小火花每 1 秒后会消失（当前帧率 60）
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        // 烟花有个加速度
        var factor = 0.02
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class ParticleSystem {
    constructor(game, name = 'spark') {
        this.game = game
        this.name = name
        this.setup()
    }
    static new(game, text) {
        return new this(game, text)
    }
    setup() {
        // 50 帧消失
        this.duration = 50
        this.x = 150
        this.y = 200
        this.numberOfParticles = 50
        this.particles = []
    }
    update() {
        this.duration--

        // 添加小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = Particle.new(this.game, this.name)
            // 设置初始化坐标
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有小火花
        for (var p1 of this.particles) {
            p1.update()
        }
        // 删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        if (this.duration < 0) {
            // todo 这是一个临时方案，应该从 scene 中删除才对
            return
        }
        for (var p of this.particles) {
            p.draw()
        }
    }
}