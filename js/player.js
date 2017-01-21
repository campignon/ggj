var Player = function(game, id, x, y, spriteName, healthBarX, healthBarY, waves, state) {

  Phaser.Sprite.call(this, game, x, y, spriteName);
  this.name = spriteName;
  this.life = PLAYERLIFE;
  this.waves = waves;
  this.state = state;
  this.currentWave = 0;
  this.canSelectWave = true;
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

  updateHealthBar();

  //mises à jours par joueur
  // - mettre à jour les points de vie
  //check les input
  //mettre à jour les waves

};

Player.prototype.updateHealthBar = function() {


}

Player.prototype.setPreviousWave = function() {
  if (this.currentWave > 0) {
    this.currentWave -= 1;
  } else {
    this.currentWave = this.waves.length - 1;
  }
  console.log("previous wave selected : " + this.currentWave);
};

Player.prototype.setNextWave = function() {
  if (this.currentWave < this.waves.length - 1) {
    this.currentWave += 1;
  } else {
    this.currentWave = 0;
  }
  console.log("next wave selected : " + this.currentWave);
};

Player.prototype.getCurrentWave = function() {
  return this.waves[this.currentWave];
};
