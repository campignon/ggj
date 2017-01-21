var PlayerMenu = function(game, background, x, y, waves) {

  Phaser.Sprite.call(this, game, x, y, background);

  this.game = game;
  this.waves = waves;

}

PlayerMenu.prototype.update = function() {

};

PlayerMenu.prototype = Object.create(Phaser.Sprite.prototype);
PlayerMenu.prototype.constructor = PlayerMenu;
