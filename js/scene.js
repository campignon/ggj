var Scene = function() {};

var pad1;
var pad2;
var player1;
var player2;
var wave1;
var wave2;
var resetDelay = true;

Scene.prototype.preload = function() {
  this.load.image('player1', 'assets/sprites/player1.png');
  this.load.image('player2', 'assets/sprites/player2.png');
  this.load.spritesheet('megawave', 'assets/sprites/waveatk.png', WAVEWIDTH, WAVEHEIGHT, 2);
};

Scene.prototype.create = function() {

  wave1 = new Wave(this, 0, 200, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE1, ATK, false, 0);
  wave2 = new Wave(this, 0, 400, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE2, ATK, false, 0);
  var wave3 = new Wave(this, 0, 600, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE3, ATK, false, 0);
  var wave4 = new Wave(this, 1050, 200, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE4, ATK, false, 0);
  var wave5 = new Wave(this, 1050, 400, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE5, ATK, false, 0);
  var wave6 = new Wave(this, 1050, 600, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE6, ATK, false, 0);

  // création des personnages
  player1 = new Player(this, PLAYER1X, PLAYER1Y, 'player1', null, null, null, 1);
  player2 = new Player(this, PLAYER2X, PLAYER2Y, 'player2', null, null, null, 1);

  this.add.existing(player1);
  this.add.existing(player2);
  this.add.existing(wave1);
  this.add.existing(wave2);
  this.add.existing(wave3);
  this.add.existing(wave4);
  this.add.existing(wave5);
  this.add.existing(wave6);

  //gestion manette
  this.input.gamepad.start();
  pad1 = this.input.gamepad.pad1;
  pad2 = this.input.gamepad.pad2;

  //lancement des timers du jeu
  wave1.startTimer();
  wave2.startTimer();
};

Scene.prototype.update = function() {

  /* bouton pour reset la wave */
  if (pad1.justReleased(Phaser.Gamepad.XBOX360_X)) {

    //player1.currentWave.resetTimer();
    resetWave(wave1);
  }
  if (pad2.justReleased(Phaser.Gamepad.XBOX360_X)) {
    //player2.currentWave.resetTimer();
    resetWave(wave2);
  }

  //bouton pour activer la wave
  if (pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
    //on récupère la wave active du joueur en question et on calcul par rapport à la valeur du joueur adverse
    wave1.animations.frame = 1;
  } else {
    wave1.animations.frame = 0;
  }

  if (pad1.justPressed(Phaser.Gamepad.XBOX360_B)) {
    wave1.stopTimer();
  }

}

function resetWave(wave) {
  if(resetDelay) {
    wave.resetTimer();
    resetDelay = false;

    var timeout = setTimeout(function () {
      resetDelay = true;
      clearTimeout(timeout);
    }, WAVE_RESET_DELAY);

  }
}
