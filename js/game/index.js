import Player from './classes/player'
import Level from './classes/level'

export default () => {

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render })

  function preload() {
    game.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48)
    game.load.image('ground', 'assets/games/starstruck/ground.png')
    game.load.image('background', 'assets/games/starstruck/background2.png')
  }

  var player
  var cursors
  var bg
  var walls
  var level

  function create() {
    // game.stage.disableVisibilityChange = true
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.world.enableBody = true

    level = new Level(game)
    level.buildLevel()

    player = new Player(game, 300, 320, 'dude')
    game.add.existing(player)
    game.physics.enable(player, Phaser.Physics.ARCADE)

    player.init(game.input.keyboard.createCursorKeys())
    player.setCollision(level.getColliders())
    player.setDetects(level.getHitDetects())

    document.player = player
    document.level = level
  }

  function update() {
    game.world.setBounds(player.position.x - 400, 0, 1600, 1200);

    player.update()
    level.update(player.getPlayerSpeed())
  }

  function render () {

  }
}