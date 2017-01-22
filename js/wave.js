var Wave = function(game, x, y, width, height, spriteName, largeSpriteName, values, type) {

  Phaser.TileSprite.call(this, game, x, y, width, height, spriteName);

  this.game = game;
  this.name = spriteName;
  this.values = values;
  this.type = type;
  this.cpt = 0;
  this.valueIndex = 0;
  this.actualValue = values[0];
  this.state = WAVE_DEFAULT;
  this.valueText = game.add.text(0, 0, this.actualValue, { font: "32px Arial", fill: "#ff0000", align: "center" });  /*{font:WAVE_FONT_SIZE + " " + WAVE_FONT_FAMILY, fill: WAVE_TEXT_COLOR, align: WAVE_TEXT_ALIGN});*/
  this.addChild(this.valueText);

  this.bigWave = game.add.tileSprite(WAVE_BIG_POSX, WAVE_BIG_POSY, width, height, spriteName);
  this.bigWave.scale.x = 5;
  this.bigWave.scale.y = 5;
  this.bigWave.visible = false;

  this.resetTimer = function() {
    this.cpt = 0;
    this.actualValue = this.values[0];
    this.tilePosition.x = 0;
    this.bigWave.tilePosition.x = 0;
    this.valueIndex = 0;
    this.setState(WAVE_COOLDOWN);
  }

  this.setState = function(state) {
    switch(state) {
      case WAVE_DEFAULT:
        if (this.state != WAVE_DEFAULT) {
          this.state = WAVE_DEFAULT;
          this.animations.frame = 0;
        }
        break;
      case WAVE_SELECTED:
        if (this.state != WAVE_SELECTED) {
          this.state = WAVE_SELECTED;
          this.animations.frame = 1;
        }
        break;
      case WAVE_ACTIVE:
        if (this.state != WAVE_ACTIVE) {
          this.state = WAVE_ACTIVE;
          this.animations.frame = 2;
          console.log("active");
        }
        break;
      case WAVE_COOLDOWN:
        if (this.state != WAVE_COOLDOWN) {
          this.state = WAVE_COOLDOWN;
          this.animations.frame = 3;
        }
        break;
      default: break;
    }
  }

  this.isState = function(state) {
    return state == this.state;
  }
}

Wave.prototype = Object.create(Phaser.TileSprite.prototype);
Wave.prototype.constructor = Wave;

Wave.prototype.update = function() {

  if (this.cpt % FRAMECOUNTSTEP == 0) {
    this.tilePosition.x -= FRAMESTEP;
    this.bigWave.tilePosition.x -= FRAMESTEP;
    this.actualValue = this.values[this.valueIndex % this.values.length];
    this.valueText.text = this.actualValue;
    this.valueIndex++;
  }

  if(this.state == WAVE_SELECTED || this.state == WAVE_ACTIVE) {

    this.bigWave.visible = true;
    this.bigWave.alpha = 1;

  } else if (this.state == WAVE_COOLDOWN) {

    this.bigWave.visible = true;
    this.bigWave.alpha = 0.5;

  } else {

    this.bigWave.visible = false;
    this.bigWave.alpha = 1;

  }

  this.cpt++;
}
