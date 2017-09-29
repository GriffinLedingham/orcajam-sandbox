class Player extends Phaser.Sprite {

  constructor(game, x, y, sprite) {
    super(game,x,y,sprite)
    this.resetStats()
  }

  update() {
    this.body.velocity.x = 0

    if (this.cursors.left.isDown) {
      this.run(-1)
    }
    else if (this.cursors.right.isDown) {
      this.run(1)
    }
    else {
      this.updateSprite(0)
    }

    if (this.jumpKey.isDown) {
      this.jump()
    }
  }

  canJump() {
    return (this.body.onFloor() && this.game.time.now > this.jumpTimer)
  }

  jump() {
    if(!this.canJump()) return

    this.body.velocity.y = -this.stats.jump
    this.jumpTimer = this.game.time.now + this.stats.jumpDelay
  }

  run(velocity) {
    this.body.velocity.x = velocity * this.stats.speed
    this.updateSprite(velocity)
  }

  updateSprite(velocity) {
    if (this.facing != 'left' && velocity < 0) {
      this.animations.play('left')
      this.facing = 'left'
    }
    else if(this.facing != 'right' && velocity > 0) {
      this.animations.play('right')
      this.facing = 'right'
    }
    else if(this.facing != 'idle' && velocity == 0) {
      this.animations.stop()
      if (this.facing == 'left') {
        this.frame = 0
      }
      else {
        this.frame = 5
      }
      this.facing = 'idle'
    }
  }

  resetStats() {
    this.jumpTimer = 0
    this.stats = {
      jump      : 300,
      jumpDelay : 250,
      speed     : 150
    }
  }

  init(cursors) {
    this.body.collideWorldBounds = true
    this.body.gravity.y = 1000
    this.body.maxVelocity.y = 500
    this.body.setSize(20, 32, 5, 16)

    this.animations.add('left', [0, 1, 2, 3], 10, true)
    this.animations.add('turn', [4], 20, true)
    this.animations.add('right', [5, 6, 7, 8], 10, true)

    this.facing = 'left'

    this.cursors = cursors
    this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

}

export default Player