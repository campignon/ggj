var Scene = function() {
  this.controlsEnabled = false;
  this.isGameOver = false;
};

var pad1;
var pad2;
var player1;
var player2;
var wave1, wave2, wave3, wave4, wave5, wave6;
var animChangeGauche, animChangeDroite;
var countdown;
var sceneOverlay;
var music;

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

  countdown = new Countdown(this.game, this, DURATION);

  //création des waves
  wave1 = new Wave(this.game, 40, 374, WAVEWIDTH, WAVEHEIGHT, 'courbe1', 'courbe1HD', TRIANGLE, ATK, 0x84e7ff);
  wave2 = new Wave(this.game, 40, 458, WAVEWIDTH, WAVEHEIGHT, 'courbe2', 'courbe2HD', CARRE, DEF, 0x84e7ff);
  wave3 = new Wave(this.game, 40, 542, WAVEWIDTH, WAVEHEIGHT, 'courbe5', 'courbe5HD', SMALLSAW, HEAL, 0x84e7ff);
  wave4 = new Wave(this.game, this.world.width - 296, 374, WAVEWIDTH, WAVEHEIGHT, 'courbe4', 'courbe4HD', SAW, ATK, 0xff00ff);
  wave5 = new Wave(this.game, this.world.width - 296, 460, WAVEWIDTH, WAVEHEIGHT, 'courbe3', 'courbe3HD', SINUS, DEF, 0xff00ff);
  wave6 = new Wave(this.game, this.world.width - 296, 534, WAVEWIDTH, WAVEHEIGHT, 'courbe6', 'courbe6HD', SMALLSINUS, HEAL, 0xff00ff);

  //création des menus
  var menu1 = new PlayerMenu(this, 'movelist-background1', 0, 350, [wave1, wave2, wave3]);
  var menu2 = new PlayerMenu(this, 'movelist-background2', this.world.width - 304, 350, [wave4, wave5, wave6]);

  // Création des healthbars
  var healthbar1 = new Healthbar(this.game, this, 1, 0, 0, PLAYERLIFE);
  var healthbar2 = new Healthbar(this.game, this, 2, this.world.width, 0, PLAYERLIFE);

  // création des personnages
  player1 = new Player(this.game, 1, PLAYER1X, PLAYER1Y, 'player1', healthbar1, menu1);
  player2 = new Player(this.game, 2, PLAYER2X, PLAYER2Y, 'player2', healthbar2, menu2);

  player1.setOpponent(player2);
  player2.setOpponent(player1);

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

  var graphicOverlay = new Phaser.Graphics(this.game, 0 , 0);
  graphicOverlay.beginFill(0x000000, 0.7);
  graphicOverlay.drawRect(0,0, this.game.width, this.game.height);
  graphicOverlay.endFill();
  var overlayTexture = graphicOverlay.generateTexture();
  sceneOverlay = this.game.add.sprite(0, 0, overlayTexture);
  overlay.alpha = 1;

  //
  var imgRebour1 = this.add.sprite(this.world.width/2, this.world.height/2, 'trois');
  imgRebour1.anchor.setTo(0.5, 0.5);
  imgRebour1.scale.setTo(0.1,0.1);

  var imgRebour2 = this.add.sprite(this.world.width/2, this.world.height/2, 'deux');
  imgRebour2.anchor.setTo(0.5, 0.5);
  imgRebour2.scale.setTo(0.1,0.1);
  imgRebour2.visible = false;

  var imgRebour3 = this.add.sprite(this.world.width/2, this.world.height/2, 'un');
  imgRebour3.anchor.setTo(0.5, 0.5);
  imgRebour3.scale.setTo(0.1,0.1);
  imgRebour3.visible = false;

  var imgRebour4 = this.add.sprite(this.world.width/2, this.world.height/2, 'fight');
  imgRebour4.anchor.setTo(0.5, 0.5);
  imgRebour4.scale.setTo(0.1,0.1);
  imgRebour4.visible = false;

  var tween1 = this.game.add.tween(imgRebour1.scale).to( { x: 1, y: 1}, 1000, "Quart.easeOut");
  var tween2 = this.game.add.tween(imgRebour2.scale).to( { x: 1, y: 1}, 1000, "Quart.easeOut");
  var tween3 = this.game.add.tween(imgRebour3.scale).to( { x: 1, y: 1}, 1000, "Quart.easeOut");
  var tween4 = this.game.add.tween(imgRebour4.scale).to( { x: 1, y: 1}, 1000, "Quart.easeOut");

  tween1.onComplete.add(function() {
    imgRebour2.visible = true;
    imgRebour1.visible = false;
    tween2.start();

  }, this);

  tween2.onComplete.add(function() {
    imgRebour3.visible = true;
    imgRebour2.visible = false;
    tween3.start();

  }, this);

  tween3.onComplete.add(function() {
    imgRebour4.visible = true;
    imgRebour3.visible = false;
    tween4.start();

  }, this);

  var leThis = this;
  tween4.onComplete.add(function() {

    imgRebour4.visible = false;
    this.game.add.tween(sceneOverlay).to({alpha:0}, 500, "Quart.easeOut").start();

    //lancement du timer de la partie
    countdown.start(this.game);
    wave1.active = wave2.active = wave3.active = wave4.active = wave5.active = wave6.active = true;

    //gestion manette
    leThis.input.gamepad.start();
    this.controlsEnabled = true;
    music.play();

  }, this);

  pad1 = this.input.gamepad.pad1;
  pad2 = this.input.gamepad.pad2;

  music = this.add.audio('theme');
  music.loop = true;

  tween1.start();

};

Scene.prototype.update = function() {
  if (!this.controlsEnabled) return;

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
    var player1Wave = player1.getCurrentWave();
    if (!player1Wave.isState(WAVE_ACTIVE) && !player1Wave.isState(WAVE_COOLDOWN)) {
      player1.setWaveState(WAVE_ACTIVE);
    }
    player1.updateAnimation();
  } else {
    if (player1.getCurrentWave().isState(WAVE_ACTIVE)) {
      player1.setWaveState(WAVE_SELECTED);
    }
    player1.updateAnimation();
  }

  //bouton pour activer la wave pour le joueur 2
  if (pad2.isDown(Phaser.Gamepad.XBOX360_A)) {
    //on récupère la wave active du joueur en question et on calcul par rapport à la valeur du joueur adverse
    var player2Wave = player2.getCurrentWave();
    if (!player2Wave.isState(WAVE_ACTIVE) && !player2Wave.isState(WAVE_COOLDOWN)) {
      player2.setWaveState(WAVE_ACTIVE);
    }
    player2.updateAnimation();
  } else {

    if (player2.getCurrentWave().isState(WAVE_ACTIVE)) {
      player2.setWaveState(WAVE_SELECTED);
    }
    player2.updateAnimation();
  }

  /* bouton pour reset la wave du joueur 1 */
  if (pad1.justReleased(Phaser.Gamepad.XBOX360_X)) {

    //player1.currentWave.resetTimer();
    resetWave(player1);
  }

  /* bouton pour reset la wave du joueur 2 */
  if (pad2.justReleased(Phaser.Gamepad.XBOX360_X)) {
    //player2.currentWave.resetTimer();
    resetWave(player2);
  }
};

Scene.prototype.gameOver = function(id) {
  if (!this.isGameOver) {
    console.log("Game over !");
    this.isGameOver = true;
    this.controlsEnabled = false;
    countdown.stop(this.game);
    player1.stop();
    player2.stop();
    wave1.active = wave2.active = wave3.active = wave4.active = wave5.active = wave6.active = false;
    this.game.add.tween(sceneOverlay).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0);

    var gridImage = this.add.sprite(0, -this.game.world.height, 'grid');
    var gridAnim = this.game.add.tween(gridImage).to({y:0}, 1000, Phaser.Easing.Bounce.Out);

    var img = id==0?'timeout':'gameover';

    var messageImage = this.add.sprite(this.game.world.width/2, this.game.world.height/2, img);
    messageImage.animations.add('walk');
    messageImage.animations.play('walk', 6, true);
    messageImage.anchor.setTo(0.5,0.5);
    messageImage.scale.setTo(2,2);
    messageImage.visible = false;

    var leThis = this;
    gridAnim.onComplete.add(function() {

        messageImage.visible = true;
        var animTimeout = leThis.game.add.tween(messageImage.scale).to({x:1, y:1}, 500, "Quart.easeOut").start();

    }, this);

    gridAnim.start();

  }
};

function resetWave(player) {
  if(player.canResetWave) {
    player.getCurrentWave().resetTimer();
    player.canResetWave = false;
    player.canSelectWave = false;

    var timeout = setTimeout(function () {
      player.canResetWave = true;
      player.canSelectWave = true;
      player.setWaveState(WAVE_SELECTED);
      clearTimeout(timeout);
    }, WAVE_RESET_DELAY);
  }
};

function lockWaveSelection(player) {

  if (player.canSelectWave) {
    player.canSelectWave = false;
    if(player.id == 1) {
      animChangeGauche.play('walk', 12, false);
    } else {
      animChangeDroite.play('walk', 12, false);
    }

    var timeout = setTimeout(function() {
      player.canSelectWave = true;
      clearTimeout(timeout);
    }, LOCK_WAVE_SELECTION_DELAY);
  }
};
