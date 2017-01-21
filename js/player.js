var Player = function(game, id, x, y, spriteName, healthBarX, healthBarY, menu, state) {

  Phaser.Sprite.call(this, game, x, y, spriteName);
  this.name = spriteName;
  this.life = PLAYERLIFE;
  this.state = state;
  this.currentWave = 0;
  this.canSelectWave = true;
  this.menu = menu;
  this.getCurrentWave().setState(WAVE_SELECTED);
  var healthbar = game.add.sprite(healthBarX, healthBarY, 'healthbar');
  if(id==2) {
    healthbar.scale.x *= -1;
  }
  healthbar.animations.add('walk');
  healthbar.animations.play('walk', 23, true);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

};

Player.prototype.setPreviousWave = function() {
  this.getCurrentWave().setState(WAVE_DEFAULT);
  if (this.currentWave > 0) {
    this.currentWave -= 1;
  } else {
    this.currentWave = this.menu.waves.length - 1;
  }
  this.getCurrentWave().setState(WAVE_SELECTED);
  console.log("previous wave selected : " + this.currentWave);
};

Player.prototype.setNextWave = function() {
  this.getCurrentWave().setState(WAVE_DEFAULT);
  if (this.currentWave < this.menu.waves.length - 1) {
    this.currentWave += 1;
  } else {
    this.currentWave = 0;
  }
  this.getCurrentWave().setState(WAVE_SELECTED);
  console.log("next wave selected : " + this.currentWave);
};

Player.prototype.getCurrentWave = function() {
  return this.menu.waves[this.currentWave];
};
