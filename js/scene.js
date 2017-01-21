var Scene = function() {};

var pad1;
var pad2;
var player1;
var player2;
var wave1, wave2, wave3, wave4, wave5, wave6;
var resetDelay = true;

Scene.prototype.preload = function() {

};

Scene.prototype.create = function() {

  var countdown = new Countdown(this, DURATION);
  countdown.start(this);

  wave1 = new Wave(this, 0, 200, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE1, ATK, 0);
  wave2 = new Wave(this, 0, 400, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE2, ATK, 0);
  wave3 = new Wave(this, 0, 600, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE3, ATK, 0);
  wave4 = new Wave(this, 1050, 200, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE4, ATK, 0);
  wave5 = new Wave(this, 1050, 400, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE5, ATK, 0);
  wave6 = new Wave(this, 1050, 600, WAVEWIDTH, WAVEHEIGHT, 'megawave', 'waveatk-l', MEGAWAVE6, ATK, 0);

  // création des personnages
  player1 = new Player(this, 1, PLAYER1X, PLAYER1Y, 'player1', 0, 0, [wave1, wave2, wave3], 1);
  player2 = new Player(this, 2, PLAYER2X, PLAYER2Y, 'player2', this.world.width - HEALTH_BAR_WIDTH, 0, [wave4, wave5, wave6], 1);

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
  // bouton changer pour la wave précédente
  if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && player1.canSelectWave) {
    player1.setPreviousWave();
    lockWaveSelection(player1);
  }

  //bouton pour activer la wave pour le joueur 1
  if (pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
    //on récupère la wave active du joueur en question et on calcul par rapport à la valeur du joueur adverse
    if (!player1.getCurrentWave().isState(WAVE_ACTIVE)) {
      player1.getCurrentWave().setState(WAVE_ACTIVE);
    }
  } else {
    if (player1.getCurrentWave().isState(WAVE_ACTIVE)) {
      player1.getCurrentWave().setState(WAVE_SELECTED);
    }
  }

  //bouton pour activer la wave pour le joueur 2
  if (pad2.isDown(Phaser.Gamepad.XBOX360_A)) {
    //on récupère la wave active du joueur en question et on calcul par rapport à la valeur du joueur adverse
    if (!player2.getCurrentWave().isState(WAVE_ACTIVE)) {
      player2.getCurrentWave().setState(WAVE_ACTIVE);
    }
  } else {
    if (player2.getCurrentWave().isState(WAVE_ACTIVE)) {
      player2.getCurrentWave().setState(WAVE_SELECTED);
    }
  }

  /* bouton pour reset la wave du joueur 1 */
  if (pad1.justReleased(Phaser.Gamepad.XBOX360_X)) {

    //player1.currentWave.resetTimer();
    resetWave(player1.getCurrentWave());
  }

  /* bouton pour reset la wave du joueur 2 */
  if (pad2.justReleased(Phaser.Gamepad.XBOX360_X)) {
    //player2.currentWave.resetTimer();
    resetWave(player2.getCurrentWave());
  }

  // if (pad1.justPressed(Phaser.Gamepad.XBOX360_B)) {
  //   wave1.stopTimer();
  // }

}

function resetWave(wave) {
  if(resetDelay) {
    wave.resetTimer();
    resetDelay = false;

    var timeout = setTimeout(function () {
      resetDelay = true;
      wave.setState(WAVE_SELECTED);
      clearTimeout(timeout);
    }, WAVE_RESET_DELAY);
  }
};

function lockWaveSelection(player) {
  if (player.canSelectWave) {
    player.canSelectWave = false;

    var timeout = setTimeout(function() {
      player.canSelectWave = true;
      clearTimeout(timeout);
    }, LOCK_WAVE_SELECTION_DELAY);
  }
};
