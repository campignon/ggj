var Game = function() {
  this.createGame();
};

Game.prototype.createGame = function() {
  this.game = new Phaser.Game(1280, 720,
      Phaser.AUTO,
      '',
      { preload: this.preload, create: this.create, update: this.update },
			false, // transparent background
			false // no antialias !
		);
};

Game.prototype.preload = function() {

};

Game.prototype.create = function() {

};

Game.prototype.update = function() {

};
