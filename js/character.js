Player = function(game, x, y, spriteName, wave1, wave2, wave3, state) {

  Phaser.Sprite.call(this, game,x,y,spriteName);
  this.name = spriteName;
  this.life = PLAYERLIFE;
  this.wave1 = wave1;
  this.wave2 = wave2;
  this.wave3 = wave3;
  this.state = state;

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

  //mises à jours par joueur
  // - mettre à jour les points de vie
  //check les input
  //mettre à jour les waves

}
