var Preloader = function() {};

Preloader.prototype.preload = function() {
  this.load.image('logo', 'assets/images/logo.png');
};

Preloader.prototype.create = function() {
  this.game.stage.backgroundColor = '#29ADFF';
  var logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5);
  logo.scale.setTo(3);
};
