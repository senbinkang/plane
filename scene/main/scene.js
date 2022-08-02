// 配置的类
const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 5,
    bullet_speed: 5,
    enemy_bullet_speed: 8,
    fire_cooldown: 9,
}

// 把 GameScene 改成面向对象的形式
class Scene extends GameScene {
    constructor(game) {
        super(game)
        // 让飞机动起来
        this.setup()
        // setupInputs()
        this.setupInputs()
    }

    setup() {
        var game = this.game
        this.numberOfEnemies = 10
        this.bg = GameImage.new(game, 'sky')
        this.cloud = Cloud.new(game, 'cloud')
        this.bullet = Bullet.new(game, 'bullet')

        // 添加到场景中的元素，能自动被 draw
        // （在 GameScene 中，把所有的 elements draw 进去）
        this.addElement(this.bg)

        // 特殊的类 player 写在此处赋值
        // this.player = GameImage.new(game, 'player')
        // this.player.x = 100
        // this.player.y = 150

        this.player = Player.new(game)
        this.player.x = 150
        this.player.y = 520
        this.player.w = this.player.texture.w
        this.player.h = this.player.texture.h
        this.addElement(this.player)

        // 场景中加敌人
        this.addEnemies()
        // 云☁️
        this.addElement(this.cloud)
    }
    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game)
            e.w = e.texture.w
            e.h = e.texture.h
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }
    setupInputs() {
        var g = this.game
        // 注册四个键，上下左右
        var s = this
        g.registerAction('a', function () {
            s.player.moveLeft()
        })
        g.registerAction('d', function () {
            s.player.moveRight()
        })
        g.registerAction('w', function () {
            s.player.moveUp()
        })
        g.registerAction('s', function () {
            s.player.moveDown()
        })
        g.registerAction('j', function () {
            s.player.fire()
        })
    }

    update() {
        // 调用 update
        super.update()
        this.cloud.y += 1

        let eBullets = this.elements.filter(e => {
            if (e.constructor.name === 'EnemyBullet') {
                e.w = e.texture.w
                e.h = e.texture.h
                return e
            }
        })
        let bullets = this.elements.filter(e => {
            if (e.constructor.name === 'Bullet') {
                e.w = e.texture.w
                e.h = e.texture.h
                return e
            }
        })
        // log('elements', this.elements)
        this.checkImpact(eBullets, bullets)
        this.isElementDied()
    }
    isElementDied() {
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            // 子弹在视图外
            if (e.isOutOfView) {
                this.elements.splice(i, 1)
            }
            // 粒子系统结束
            if (e.duration < 0) {
                this.elements.splice(i, 1)
            }
        }
    }

    checkImpact(eBullets, bullets) {
        // 敌人子弹和飞机碰撞
        this.oneImpactOthers(this.player, eBullets)
        // 检测玩家和玩家子弹
        this.oneImpactOthers(this.player, this.enemies)

        // 敌人和子弹碰撞
        this.othersImpactOthers(this.enemies, bullets)
        this.othersImpactOthers(eBullets, bullets, false)
    }
    // 碰撞——多对多
    othersImpactOthers(arr1, arr2, isBoom = true) {
        for (const e of arr1) {
            for (const b of arr2) {
                if (isImpact(e, b)) {
                    // 添加 particles
                    if (isBoom) {
                        var ps = ParticleSystem.new(this.game, 'spark_blue')
                        let { x, y, w, h, } = e
                        ps.x = x + w / 2
                        ps.y = y + h / 2
                        this.addElement(ps)
                    }
                    b.alive = false
                    e.alive = false
                }
            }
        }
    }
    // 碰撞——一对多
    oneImpactOthers(a, arr) {
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i]
            if (isImpact(a, e)) {
                // 添加 particles
                var ps = ParticleSystem.new(this.game)
                let { x, y, w, h, } = a
                ps.x = x + w / 2
                ps.y = y + h / 2
                this.addElement(ps)
                a.alive = false
                e.alive = false

                // 跳转到游戏结束的场景
                let game = this.game
                setTimeout(() => {
                    let end = SceneEnd.new(game)
                    game.replaceScene(end)
                }, 2000)
            }
        }
    }
}