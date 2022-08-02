class SceneEnd extends GameScene {
    constructor(game) {
        super(game)

        // 游戏结束场景
        var endScene = GameImage.new(this.game, 'end_scene')
        this.addElement(endScene)

        game.registerAction('r', function () {
            // 如果游戏已经开始（已经是开始游戏的场景），则不生效
            if (game.scene instanceof Scene) {
                return
            }

            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
    }

    draw() {
        super.draw()
        // draw labels
        // this.game.context.fillStyle = 'red'
        // this.game.context.fillText('游戏结束，按 r 返回标题界面', 100, 200)
    }
}