var Wave = function(game, x, y, width, height, spriteName, largeSpriteName, values, type, actualValue) {

  Phaser.TileSprite.call(this, game, x, y, width, height, spriteName);

  this.game = game;
  this.name = spriteName;
  this.values = values;
  this.type = type;
  this.cpt = 0;
  this.actualValue = actualValue;
  this.state = WAVE_DEFAULT;
  this.valueText = game.add.text(0, 0, this.actualValue, { font: "32px Arial", fill: "#ff0000", align: "center" });  /*{font:WAVE_FONT_SIZE + " " + WAVE_FONT_FAMILY, fill: WAVE_TEXT_COLOR, align: WAVE_TEXT_ALIGN});*/
  this.addChild(this.valueText);

  // var style = { font: "32px Arial", fill: "#ff0000", align: "center" };
  // var text = this.game.add.text(x, y+height, "- text on a sprite -\ndrag me", style);

  this.startTimer = function() {

    //update values
    this.loopValues = game.time.events.loop(WAVE_VALUES_UPDATE_TIME, function() {

      this.actualValue = this.values[this.cpt];
      this.cpt++;
      this.cpt %= WAVELENGTH;

    }, this);

    //update position
    this.loopPosition = game.time.events.loop(WAVE_POSITION_UPDATE_TIME, function() {
      this.tilePosition.x -= WAVESPEED;

    }, this);

  }

  this.resetTimer = function() {
    this.cpt = 0;
    this.actualValue = this.values[this.cpt];
    this.tilePosition.x = 0;
    this.setState(WAVE_COOLDOWN);
  }

  this.stopTimer = function() {

    game.time.events.remove(this.loopPosition);
    game.time.events.remove(this.loopValues);

  }

  this.setState = function(state) {
    switch(state) {
      case WAVE_DEFAULT:
        if (this.state != WAVE_DEFAULT) {
          this.state = WAVE_DEFAULT;
          this.animations.frame = 0;
          console.log(spriteName + ", state = DEFAULT");
        }
        break;
      case WAVE_SELECTED:
        if (this.state != WAVE_SELECTED) {
          this.state = WAVE_SELECTED;
          this.animations.frame = 1;
          console.log(spriteName + ", state = SELECTED");
        }
        break;
      case WAVE_ACTIVE:
        if (this.state != WAVE_ACTIVE) {
          this.state = WAVE_ACTIVE;
          this.animations.frame = 2;
          console.log(spriteName + ", state = ACTIVE");
        }
        break;
      case WAVE_COOLDOWN:
        if (this.state != WAVE_COOLDOWN) {
          this.state = WAVE_COOLDOWN;
          this.animations.frame = 3;
          console.log(spriteName + ", state = COOLDOWN");
        }
        break;
      default: break;
    }
    console.log("active");
  }

  this.isState = function(state) {
    return state == this.state;
  }

}

Wave.prototype = Object.create(Phaser.TileSprite.prototype);
Wave.prototype.constructor = Wave;

Wave.prototype.update = function() {
  this.valueText.text = this.actualValue;
}
