var Scene = function() {};

var pad1;
var pad2;
var player1;
var player2;
var wave1, wave2, wave3, wave4, wave5, wave6;
var resetDelay = true;
var animChangeGauche, animChangeDroite;

Scene.prototype.preload = function() {

};

Scene.prototype.create = function() {


  var ground = this.add.sprite(0, 0, 'ground');
  this.add.existing(ground);

  var plan2 = this.add.sprite(40, this.world.height - 292, 'plan2');
  this.add.existing(plan2);

  var animplan2D = this.add.sprite(this.world.width - 640, plan2.y, 'animplan2D');
  animplan2D.animations.add('walk');
  animplan2D.animations.play('walk', 10, true);

  var animplan2G = this.add.sprite(40, plan2.y, 'animplan2G');
  animplan2G.animations.add('walk');
  animplan2G.animations.play('walk', 10, true);

  var arene = this.add.sprite(448, this.world.height - 157, 'arene');
  this.add.existing(arene);
  arene.animations.add('walk');
  arene.animations.play('walk', 12, true);

  var overlay = this.add.sprite(0, 0, 'overlay');
  this.add.existing(overlay);

  animChangeGauche = this.add.sprite(16,208,'animbtG');
  this.add.existing(animChangeGauche);
  animChangeGauche.animations.add('walk');

  animChangeDroite = this.add.sprite(this.world.width - 16 - 32, 208,'animbtD');
  this.add.existing(animChangeDroite);
  animChangeDroite.animations.add('walk');

  var countdown = new Countdown(this, DURATION);
  countdown.start(this);

  //création des waves
  wave1 = new Wave(this, 40, 374, WAVEWIDTH, WAVEHEIGHT, 'courbe1', 'courbe1HD', TRIANGLE, ATK, 0xff00ff);
  wave2 = new Wave(this, 40, 458, WAVEWIDTH, WAVEHEIGHT, 'courbe2', 'courbe2HD', CARRE, DEF, 0xff00ff);
  wave3 = new Wave(this, 40, 542, WAVEWIDTH, WAVEHEIGHT, 'courbe3', 'courbe3HD', SINUS, ATK, 0xff00ff);
  wave4 = new Wave(this, this.world.width - 296, 374, WAVEWIDTH, WAVEHEIGHT, 'courbe4', 'courbe4HD', SAW, ATK, 0x84e7ff);
  wave5 = new Wave(this, this.world.width - 296, 450, WAVEWIDTH, WAVEHEIGHT, 'courbe5', 'courbe5HD', SMALLSAW, ATK, 0x84e7ff);
  wave6 = new Wave(this, this.world.width - 296, 534, WAVEWIDTH, WAVEHEIGHT, 'courbe6', 'courbe6HD', SMALLSINUS, ATK, 0x84e7ff);

  //création des menus
  var menu1 = new PlayerMenu(this, 'movelist-background1', 0, 350, [wave1, wave2, wave3]);
  var menu2 = new PlayerMenu(this, 'movelist-background2', this.world.width - 304, 350, [wave4, wave5, wave6]);

  // Création des healthbars
  var healthbar1 = new Healthbar(this, 1, 0, 0, PLAYERLIFE);
  var healthbar2 = new Healthbar(this, 2, this.world.width, 0, PLAYERLIFE);

  // création des personnages
  player1 = new Player(this.game, 1, PLAYER1X, PLAYER1Y, 'player1', healthbar1, menu1);
  player2 = new Player(this.game, 2, PLAYER2X, PLAYER2Y, 'player2', healthbar2, menu2);

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

  // start players
  player1.startPlayerActions(player1, player2);
  player2.startPlayerActions(player2, player1);

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
    player1.updateAnimation();
  } else {
    if (player1.getCurrentWave().isState(WAVE_ACTIVE)) {
      player1.getCurrentWave().setState(WAVE_SELECTED);
    }
    player1.updateAnimation();
  }

  //bouton pour activer la wave pour le joueur 2
  if (pad2.isDown(Phaser.Gamepad.XBOX360_A)) {
    //on récupère la wave active du joueur en question et on calcul par rapport à la valeur du joueur adverse
    if (!player2.getCurrentWave().isState(WAVE_ACTIVE)) {
      player2.getCurrentWave().setState(WAVE_ACTIVE);
    }
    player1.updateAnimation();
  } else {
    if (player2.getCurrentWave().isState(WAVE_ACTIVE)) {
      player2.getCurrentWave().setState(WAVE_SELECTED);
    }
    player2.updateAnimation();
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
    if(player.id == 1) {
      animChangeDroite.play('walk', 12, false);
    } else {
      animChangeGauche.play('walk', 12, false);
    }

    var timeout = setTimeout(function() {
      player.canSelectWave = true;
      clearTimeout(timeout);
    }, LOCK_WAVE_SELECTION_DELAY);
  }
};
