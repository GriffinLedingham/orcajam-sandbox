class Level {

  constructor(game) {
    this.tileWidth = 49
    this.tileHeight = 52
    this.vertOffset = 24
    this.bgWidth = 1024
    this.bgHeight = 768
    this.game = game
    this.bgs = this.game.add.group()
    this.bgs.add(this.game.add.tileSprite(0, 0, this.bgWidth, this.bgHeight, 'background'))
    this.bgs.add(this.game.add.tileSprite(this.bgWidth, 0, this.bgWidth, this.bgHeight, 'background'))
    this.hitDetects = this.game.add.group()
  }

  update(speed) {
    for(var i in this.walls.children) {
      if(this.walls.children[i].body.x < (this.game.camera.x - (this.tileWidth*2))) {
        this.walls.remove(this.walls.children[i])
        this.addNewTile()
      }
    }

    for(var i in this.bgs.children) {
      if(this.bgs.children[i].body.x < (this.game.camera.x - this.bgWidth)) {
        this.bgs.remove(this.bgs.children[i])
        var max = 0
        for(var j in this.bgs.children) {
          var bgI = this.bgs.children[j]
          if(typeof bgI.position != 'undefined' && bgI.position.x > max) {max = bgI.position.x;}
        }
        this.bgs.add(this.game.add.tileSprite(max + this.bgWidth, 0, this.bgWidth, this.bgHeight, 'background'))
      }
    }
  }

  init() {

  }

  getColliders() {
    var colliders = this.walls
    return colliders
  }

  getHitDetects() {
    var detects = this.hitDetects
    return detects
  }

  buildLevel() {
    this.walls = this.game.add.group();

    var level = [
      '                      ',
      '                      ',
      '                      ',
      '                      ',
      '                      ',
      '                      ',
      '                      ',
      '                      ',
      '                      ',
      '                      ',
      '                      ',
      'xxxxxxxxxxxxxxxxxxxxxxx'
    ];

    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        if (level[i][j] == 'x') {
          var wall = this.game.add.sprite((this.tileWidth*j), (this.tileHeight*i)-this.vertOffset, 'ground')
          this.walls.add(wall)
          wall.body.immovable = true
        }
      }
    }
  }

  addTilesFromArray(baseX, baseY, tileArray) {
    for (var i = 0; i < tileArray.length; i++) {
      for (var j = 0; j < tileArray[i].length; j++) {
        if (tileArray[i][j] == 'x') {
          var wall = this.game.add.sprite(baseX + (this.tileWidth*j), baseY + (this.tileHeight*i), 'ground')
          this.walls.add(wall)
          wall.body.immovable = true
        }
      }
    }
  }

  addGap(size) {
    var tiles = 'xx'
    for(var i = 0;i<size;i++) {
      tiles += ' '
    }
    tiles += 'xxxx'

    this.addHitLayer(size)

    return [tiles]
  }

  addWall(size) {
    var result = []
    for(var j = 0;j<size-1;j++)
    {
      var tiles = '   x  '
      result.push(tiles)
    }
    result.push('xxxxxxx')

    this.addHitLayer(1)

    return result
  }

  addHitLayer(size) {
    var hitLayer = '   j'
    for(var i = 0;i<size;i++) {
      hitLayer += ' '
    }
    hitLayer += '  '

    var max = 0
    for(var i in this.walls.children) {
      var wallI = this.walls.children[i]
      if(typeof wallI.position != 'undefined' && wallI.position.x > max) {max = wallI.position.x;}
    }

    for (var i = 0; i < hitLayer.length; i++) {
      for (var j = 0; j < hitLayer[i].length; j++) {
        if (hitLayer[i][j] == 'j') {
          var hit = this.game.add.sprite(max + (this.tileWidth*(j+3)), (this.tileHeight*10)-this.vertOffset, null)
          this.hitDetects.add(hit)
          hit.body.immovable = true
        }
      }
    }
  }

  addNewTile() {
    var num = Math.floor((Math.random() * 10) + 1)
    if(num != 8 && num != 9) {

      // This adds one tile to the end
      //
      var max = 0
      for(var i in this.walls.children) {
        var wallI = this.walls.children[i]
        if(typeof wallI.position != 'undefined' && wallI.position.x > max) {max = wallI.position.x;}
      }

      var wall = this.game.add.sprite(max+this.tileWidth, (this.tileHeight*11)-this.vertOffset, 'ground')
      this.walls.add(wall)
      wall.body.immovable = true

    }
    else if(num == 8) {

      // This adds a predefined wall tile cluster
      //
      this.addTileCluster('wall')

    }
    else {

      // This adds a predefined gap tile cluster
      //
      this.addTileCluster('gap')

    }
  }

  addTileCluster(type) {
    var max = 0
    for(var i in this.walls.children) {
      var wallI = this.walls.children[i]
      if(typeof wallI.position != 'undefined' && wallI.position.x > max) {max = wallI.position.x;}
    }

    switch(type) {
      case 'gap':
        this.addTilesFromArray(max+this.tileWidth, (this.tileHeight*11)-this.vertOffset, this.addGap(Math.floor((Math.random() * 3) + 1)))
        break;
      case 'wall':
        var size = 2
        this.addTilesFromArray(max+this.tileWidth, (this.tileHeight*(11 - size + 1))-this.vertOffset, this.addWall(size))
        break;
    }
  }
}

function tileOut(wall) {
  console.log('destroy tile')
  wall.destroy()
}

export default Level