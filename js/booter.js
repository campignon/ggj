var Booter = function() {};

Booter.prototype.preload = function() {
  this.load.image('logo', 'assets/sprites/title.png');
  this.load.image('preloadbar', 'assets/sprites/preloader-bar.png');

  // No antialiasing
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

  // Scaling options
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  // Centering game
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
};

Booter.prototype.create = function() {
  this.game.physics.startSystem(Phaser.Physics.ARCADE);
  this.state.start('Preloader');
};
