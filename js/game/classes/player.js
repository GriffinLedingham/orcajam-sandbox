class Player extends Phaser.Sprite {

  constructor(game, x, y, sprite) {
    super(game,x,y,sprite)
    this.resetStats()
    this._init()
  }

  update() {
    this.body.velocity.x = -this.getPlayerSpeed()

    if(typeof this.colliders == 'object') {
      for(var i in this.colliders) {
        this.game.physics.arcade.collide(this, this.colliders[i]);
      }
    }

    if(typeof this.hitDetects == 'object') {
      for(var i in this.hitDetects) {
        for(var j in this.hitDetects[i].children) {
          if(checkOverlap(this, this.hitDetects[i].children[j])) {
            this.jump()
          }
        }
      }
    }

    if(this.body.touching.left || this.body.touching.right) {
      this.stats.speed = 0
    }

    if (this.cursors.left.isDown) {
      // this.run(-1)
    }
    else if (this.cursors.right.isDown) {
      // this.run(1)
    }
    else {
      this.updateSprite(0)
    }

    if (this.jumpKey.isDown) {
      this.jump()
    }
  }

  onFloor() {
    return this.body.onFloor()
  }

  onTile() {
    return this.body.touching.down
  }

  canJump() {
    return ((this.onFloor() || this.onTile()) && this.game.time.now > this.jumpTimer)
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

  getPlayerSpeed() {
    return (-this.stats.speed);
  }

  updateSprite(velocity) {
    this.animations.play('right')
    this.facing = 'right'
  }

  setCollision(object) {
    this.colliders.push(object)
  }

  setDetects(object) {
    this.hitDetects.push(object)
  }

  updateJump(delta) {
    this.stats.jump += delta
  }

  resetStats() {
    this.jumpTimer = 0
    this.stats = {
      jump      : 400,
      jumpDelay : 250,
      speed     : 150,
      gravity   : 1000
    }
  }

  _init() {
    this.colliders = []
    this.hitDetects = []
  }

  init(cursors) {
    this.body.gravity.y = this.stats.gravity
    this.body.setSize(20, 32, 5, 16)

    this.animations.add('left', [0, 1, 2, 3], 10, true)
    this.animations.add('turn', [4], 20, true)
    this.animations.add('right', [5, 6, 7, 8], 10, true)

    this.facing = 'left'

    this.cursors = cursors
    this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }

}

function checkOverlap(spriteA, spriteB) {

  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();

  return Phaser.Rectangle.intersects(boundsA, boundsB);

}

export default Player