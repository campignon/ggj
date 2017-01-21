var Preloader = function() {};

Preloader.prototype.preload = function() {
  // Background color
  this.stage.backgroundColor = PRELOADER_BACKGROUND;

  // Adding the logo on screen
  var logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5);
  logo.scale.setTo(PRELOADER_LOGO_SCALE_FACTOR);

  var preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY - PRELOADER_PRELOAD_BAR_OFFSET_Y, 'preloadbar');
  preloadBar.anchor.setTo(0.5);
  preloadBar.scale.setTo(PRELOADER_PRELOAD_BAR_SCALE_FACTOR);

  // Apply preloader sprite
  this.load.setPreloadSprite(preloadBar);

  // Loading assets
  this.load.image('playButton', 'assets/sprites/playButton.png');
  this.load.image('timer', 'assets/sprites/timer.png');
  this.load.spritesheet('healthbar', 'assets/sprites/barredevie.png', 540,48);
  this.load.image('player1', 'assets/sprites/player1.png');
  this.load.image('player2', 'assets/sprites/player2.png');
  this.load.image('overlay', 'assets/sprites/overlay.png');
  this.load.image('ground', 'assets/sprites/ground.png');
  this.load.image('movelist-background1', 'assets/sprites/movelist-background1.png');
  this.load.image('movelist-background2', 'assets/sprites/movelist-background2.png');
  this.load.spritesheet('courbe1', 'assets/sprites/courbe1.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe2', 'assets/sprites/courbe2.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe3', 'assets/sprites/courbe3.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe4', 'assets/sprites/courbe4.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe5', 'assets/sprites/courbe5.png', WAVEWIDTH, WAVEHEIGHT, 4);
  this.load.spritesheet('courbe6', 'assets/sprites/courbe6.png', WAVEWIDTH, WAVEHEIGHT, 4);
};

Preloader.prototype.create = function() {
  this.state.start('MainMenu');
};
