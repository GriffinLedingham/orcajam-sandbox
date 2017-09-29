import Player from './classes/player'

export default () => {

  var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render })

  function preload() {
    game.load.spritesheet('dude', 'assets/games/starstruck/dude.png', 32, 48)
    game.load.image('background', 'assets/games/starstruck/background2.png')
  }

  var player
  var cursors
  var bg

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    bg = game.add.tileSprite(0, 0, 800, 600, 'background')

    game.physics.arcade.gravity.y = 300

    player = new Player(game, 32, 320, 'dude')
    game.add.existing(player)

    game.physics.enable(player, Phaser.Physics.ARCADE)

    cursors = game.input.keyboard.createCursorKeys()

    player.init(cursors)
  }

  function update() {
    player.update()
  }

  function render () {

  }
}