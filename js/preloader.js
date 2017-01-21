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
  this.load.image('playButton', 'assets/images/playButton.png');
  this.load.image('timer', 'assets/images/timer.png');
  this.load.image('healthbar', 'assets/images/healthbar.png');
  this.load.image('player1', 'assets/sprites/player1.png');
  this.load.image('player2', 'assets/sprites/player2.png');
  this.load.spritesheet('megawave', 'assets/sprites/waveatk.png', WAVEWIDTH, WAVEHEIGHT, 2);
};

Preloader.prototype.create = function() {
  this.state.start('MainMenu');
};
