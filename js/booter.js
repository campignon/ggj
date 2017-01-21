var Booter = function() {};

Booter.prototype.preload = function() {
  this.load.image('logo', 'assets/images/logo.png');

  // No antialiasing
  Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);

  // Scaling options
  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  // Centering game
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
};

Booter.prototype.create = function() {
  this.state.start('Preloader');
};
