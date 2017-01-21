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


  var ground = this.add.sprite(0, 0, 'ground');
  this.add.existing(ground);

  var plan2 = this.add.sprite(40, this.world.height - 292, 'plan2');
  this.add.existing(plan2);

  var arene = this.add.sprite(448, this.world.height - 157, 'arene');
  this.add.existing(arene);
  arene.animations.add('walk');
  arene.animations.play('walk', 12, true);

  var overlay = this.add.sprite(0, 0, 'overlay');
  this.add.existing(overlay);

  var countdown = new Countdown(this, DURATION);
  countdown.start(this);

  //création des waves
  wave1 = new Wave(this, 32, 234, WAVEWIDTH, WAVEHEIGHT, 'courbe1', 'waveatk-l', MEGAWAVE1, ATK, 0);
  wave2 = new Wave(this, 32, 312, WAVEWIDTH, WAVEHEIGHT, 'courbe2', 'waveatk-l', MEGAWAVE2, ATK, 0);
  wave3 = new Wave(this, 32, 392, WAVEWIDTH, WAVEHEIGHT, 'courbe3', 'waveatk-l', MEGAWAVE3, ATK, 0);
  wave4 = new Wave(this, this.world.width - 288, 234, WAVEWIDTH, WAVEHEIGHT, 'courbe4', 'waveatk-l', MEGAWAVE4, ATK, 0);
  wave5 = new Wave(this, this.world.width - 288, 312, WAVEWIDTH, WAVEHEIGHT, 'courbe5', 'waveatk-l', MEGAWAVE5, ATK, 0);
  wave6 = new Wave(this, this.world.width - 288, 392, WAVEWIDTH, WAVEHEIGHT, 'courbe6', 'waveatk-l', MEGAWAVE6, ATK, 0);

  //création des menus
  var menu1 = new PlayerMenu(this, 'movelist-background1', 0, 200, [wave1, wave2, wave3]);
  var menu2 = new PlayerMenu(this, 'movelist-background2', this.world.width - 304, 200, [wave4, wave5, wave6]);

  // Création des healthbars
  var healthbar1 = new Healthbar(this, 1, 0, 0);
  var healthbar2 = new Healthbar(this, 2, this.world.width, 0);

  // création des personnages
  player1 = new Player(this, 1, PLAYER1X, PLAYER1Y, 'player1', healthbar1, menu1, 1);
  player2 = new Player(this, 2, PLAYER2X, PLAYER2Y, 'player2', healthbar2, menu2, 1);

  this.add.existing(player1);
  this.add.existing(player2);
  this.add.existing(menu1);
  this.add.existing(menu2);
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

  startGame();
  //lancement des timers du jeu
  wave1.startTimer();
  wave2.startTimer();
  wave3.startTimer();
  wave4.startTimer();
  wave5.startTimer();
  wave6.startTimer();

};

Scene.prototype.update = function() {
  // bouton changer pour la wave précédente pour le joueur 1
  if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && player1.canSelectWave) {
    player1.setPreviousWave();
    lockWaveSelection(player1);
  }

  if (pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1 && player2.canSelectWave) {
    player2.setPreviousWave();
    lockWaveSelection(player2);
  }

  // bouton changer pour la wave suivante pour le joueur 1
  if (pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && player1.canSelectWave) {
    player1.setNextWave();
    lockWaveSelection(player1);
  }

  if (pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1 && player2.canSelectWave) {
    player2.setNextWave();
    lockWaveSelection(player2);
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

}

function startGame() {


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
