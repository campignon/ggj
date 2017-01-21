var Player = function(game, id, x, y, spriteName, healthBarX, healthBarY, wave1, wave2, wave3, state) {

  Phaser.Sprite.call(this, game, x, y, spriteName);
  this.name = spriteName;
  this.life = PLAYERLIFE;
  this.wave1 = wave1;
  this.wave2 = wave2;
  this.wave3 = wave3;
  this.state = state;
  this.currentWave = wave1;
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


function updateHealthBar() {


}
