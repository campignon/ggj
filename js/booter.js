var Booter = function() {};

Booter.prototype.preload = function() {

  this.load.image('player1', 'assets/sprites/player1.png');
  this.load.image('player2', 'assets/sprites/player2.png');

};

Booter.prototype.create = function() {

  // création des personnages
  var player1 = new Player(this, 0, 0, 'player1', null, null, null, 1);
  var player2 = new Player(this, 100, 0, 'player2', null, null, null, 1);

  this.add.existing(player1);
  this.add.existing(player2);

};
