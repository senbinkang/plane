class GameLabel {
    constructor(game, text) {
        this.game = game
        this.text = text
    }
    static new(game, text) {
        return new this(game, text)
    }
    draw() {
        this.game.context.fillText(this.text, 150, 500)
    }
    update() {

    }
}

class SceneTitle extends GameScene {
    constructor(game) {
        super(game)

        // 开始游戏场景
        var startScene = GameImage.new(game, 'start_scene')
        this.addElement(startScene)

        // var label = GameLabel.new(game, '按 k 开始游戏，按 j 发射子弹')
        // this.addElement(label)

        game.registerAction('k', function () {
            // 如果游戏已经开始（已经是开始游戏的场景），则不生效
            if (game.scene instanceof Scene || game.scene instanceof SceneEnd) {
                return
            }

            var s = Scene.new(game)
            game.replaceScene(s)
        })
    }
    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillText('按 k 开始游戏', 100, 100)
    }
}