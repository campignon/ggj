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
  this.delay = 0;

  this.startTimer = function() {

    game.time.events.loop(Phaser.Timer.SECOND, updateValues, this);
    game.time.events.loop(Phaser.Timer.SECOND, updateMove, this);

  }
  this.startTimer();
}

Wave.prototype = Object.create(Phaser.TileSprite.prototype);
Wave.prototype.constructor = Wave;


Wave.prototype.update = function() {

  //mouvement de déplacement
  // this.tilePosition.x -= WAVESPEED;
  // this.delay++;
  //
  // if(this.delay > DELAY) {
  //   this.delay = 0;
  //   //évolution des valeurs
  //   this.actualValue = this.values[this.cpt];
  //   console.log(this.actualValue);
  //   this.cpt++;
  //   this.cpt %= WAVELENGTH;
  // }

}
