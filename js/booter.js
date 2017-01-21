var Booter = function() {};

Booter.prototype.preload = function() {

  this.load.image('player1', 'assets/sprites/player1.png');
  this.load.image('player2', 'assets/sprites/player2.png');
  this.load.image('megawave', 'assets/sprites/waveatk.png');

};

Booter.prototype.create = function() {

  var wave1 = new Wave(this, 0, 200, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'megawave', 'waveatk-l', MEGAWAVE, ATK, false, 0);

  // création des personnages
  var player1 = new Player(this, PLAYER1X, PLAYER1Y, 'player1', null, null, null, 1);
  var player2 = new Player(this, PLAYER2X, PLAYER2Y, 'player2', null, null, null, 1);

  this.add.existing(player1);
  this.add.existing(player2);
  this.add.existing(wave1);

};

Booter.prototype.update = function() {

}
