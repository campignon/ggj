var Preloader = function() {};

Preloader.prototype.preload = function() {
  // Background color
  this.stage.backgroundColor = PRELOADER_BACKGROUND;

  // Adding the logo on screen
  var logo = this.add.sprite(0, 0, 'title');

  var preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY - PRELOADER_PRELOAD_BAR_OFFSET_Y, 'preloadbar');
  preloadBar.anchor.setTo(0.5);
  preloadBar.scale.setTo(PRELOADER_PRELOAD_BAR_SCALE_FACTOR);

  // Apply preloader sprite
  this.load.setPreloadSprite(preloadBar);

  // Loading assets
  this.load.spritesheet('playButton', 'assets/sprites/playButton.png', 264, 72, 4);
  this.load.image('un', 'assets/sprites/1.png');
  this.load.image('deux', 'assets/sprites/2.png');
  this.load.image('trois', 'assets/sprites/3.png');
  this.load.image('fight', 'assets/sprites/fight.png');
  this.load.image('timer', 'assets/sprites/timer.png');
  this.load.image('grid', 'assets/sprites/grid.png');
  this.load.spritesheet('timeout', 'assets/sprites/timeout.png',1280,720,4);
  this.load.spritesheet('gameover', 'assets/sprites/gameover.png',1280,720,4);
  this.load.spritesheet('healthbar', 'assets/sprites/barredevie.png', 540,48);
  this.load.spritesheet('player1', 'assets/sprites/p1.png', 296, 256, 18);
  this.load.spritesheet('player2', 'assets/sprites/p2.png', 296, 256, 18);
  this.load.spritesheet('title', 'assets/sprites/titre.png', 1280,720, 4);
  this.load.image('overlay', 'assets/sprites/overlay.png');
  this.load.image('ground', 'assets/sprites/ground.png');
  this.load.image('plan2', 'assets/sprites/plan2.png');
  this.load.spritesheet('movelist-background1', 'assets/sprites/movelist-background1.png', 304, 256, 4);
  this.load.spritesheet('movelist-background2', 'assets/sprites/movelist-background2.png', 304, 256, 4);
  this.load.spritesheet('animbtG', 'assets/sprites/animbtG.png', 32, 160, 12);
  this.load.spritesheet('animbtD', 'assets/sprites/animbtD.png', 32, 160, 12);
  this.load.spritesheet('arene', 'assets/sprites/arene.png', 344, 124, 24);
  this.load.spritesheet('animplan2D', 'assets/sprites/animplan2D.png', 600, 108, 17);
  this.load.spritesheet('animplan2G', 'assets/sprites/animplan2G.png', 600, 108, 17);
  this.load.spritesheet('courbe1', 'assets/sprites/courbe1.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe2', 'assets/sprites/courbe2.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe3', 'assets/sprites/courbe3.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe4', 'assets/sprites/courbe4.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe5', 'assets/sprites/courbe5.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe6', 'assets/sprites/courbe6.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.image('courbe1HD', 'assets/sprites/courbe1HD.png');
  this.load.image('courbe2HD', 'assets/sprites/courbe2HD.png');
  this.load.image('courbe3HD', 'assets/sprites/courbe3HD.png');
  this.load.image('courbe4HD', 'assets/sprites/courbe4HD.png');
  this.load.image('courbe5HD', 'assets/sprites/courbe5HD.png');
  this.load.image('courbe6HD', 'assets/sprites/courbe6HD.png');
  this.load.audio('theme', 'assets/sound/theme.mp3');
};

Preloader.prototype.create = function() {
  this.state.start('MainMenu');
};
