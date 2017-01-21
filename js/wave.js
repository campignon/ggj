var Wave = function(game, x, y, width, height, spriteName, largeSpriteName, values, type, active, actualValue) {

  Phaser.TileSprite.call(this, game, x, y, width, height, spriteName);

  if(active) {
    Phaser.TileSprite.call(this, game, LARGESPRITEX, LARGESPRITEY, largeSpriteName);
  }
  this.game = game;
  this.name = spriteName;
  this.values = values;
  this.type = type;
  this.cpt = 0;
  this.actualValue = actualValue;
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
  }

  this.stopTimer = function() {

    game.time.events.remove(this.loopPosition);
    game.time.events.remove(this.loopValues);

  }

}

Wave.prototype = Object.create(Phaser.TileSprite.prototype);
Wave.prototype.constructor = Wave;

Wave.prototype.update = function() {
  this.valueText.text = this.actualValue;
}
