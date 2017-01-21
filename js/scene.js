var Scene = function() {};

Scene.prototype.preload = function() {
  this.load.image('player1', 'assets/sprites/player1.png');
  this.load.image('player2', 'assets/sprites/player2.png');
  this.load.image('megawave', 'assets/sprites/waveatk.png');
};

Scene.prototype.create = function() {

  //var waveTextGroup = new Phaser.Group(this);

  var wave1 = new Wave(this, 0, 200, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'megawave', 'waveatk-l', MEGAWAVE1, ATK, false, 0);
  var wave2 = new Wave(this, 0, 400, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'megawave', 'waveatk-l', MEGAWAVE2, ATK, false, 0);
  var wave3 = new Wave(this, 0, 600, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'megawave', 'waveatk-l', MEGAWAVE3, ATK, false, 0);
  var wave4 = new Wave(this, 1050, 200, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'megawave', 'waveatk-l', MEGAWAVE4, ATK, false, 0);
  var wave5 = new Wave(this, 1050, 400, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'megawave', 'waveatk-l', MEGAWAVE5, ATK, false, 0);
  var wave6 = new Wave(this, 1050, 600, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'megawave', 'waveatk-l', MEGAWAVE6, ATK, false, 0);

  // création des personnages
  var player1 = new Player(this, PLAYER1X, PLAYER1Y, 'player1', null, null, null, 1);
  var player2 = new Player(this, PLAYER2X, PLAYER2Y, 'player2', null, null, null, 1);


  this.add.existing(player1);
  this.add.existing(player2);
  this.add.existing(wave1);
  this.add.existing(wave2);
  this.add.existing(wave3);
  this.add.existing(wave4);
  this.add.existing(wave5);
  this.add.existing(wave6);

};
