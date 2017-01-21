Wave = function(game, x, y, width, height, name, spriteName, largeSpriteName, values, type, active, actualValue) {

  Phaser.TileSprite.call(this, game, x, y, width, height, spriteName);

  if(active) {
    Phaser.TileSprite.call(this, game, LARGESPRITEX, LARGESPRITEY, largeSpriteName);
  }
  this.game = game;
  this.name = name;
  this.values = values;
  this.type = type;
  this.cpt = 0;
  this.actualValue = actualValue;
  this.valueText = this.game.add.text(x, y+height, this.actualValue, { font: "32px Arial", fill: "#ff0000", align: "center" });  /*{font:WAVE_FONT_SIZE + " " + WAVE_FONT_FAMILY, fill: WAVE_TEXT_COLOR, align: WAVE_TEXT_ALIGN});*/

  // var style = { font: "32px Arial", fill: "#ff0000", align: "center" };
  // var text = this.game.add.text(x, y+height, "- text on a sprite -\ndrag me", style);

  this.startTimer = function() {

    //update values
    game.time.events.loop(WAVE_VALUES_UPDATE_TIME, function() {

      this.actualValue = this.values[this.cpt];
      this.cpt++;
      this.cpt %= WAVELENGTH;

    }, this);

    //update position
    game.time.events.loop(WAVE_POSITION_UPDATE_TIME, function() {
      this.tilePosition.x -= WAVESPEED;

    }, this);

  }
  this.startTimer();
}

Wave.prototype = Object.create(Phaser.TileSprite.prototype);
Wave.prototype.constructor = Wave;

Wave.prototype.update = function() {

  this.valueText.text = this.actualValue;
}
