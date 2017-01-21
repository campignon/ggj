var Preloader = function() {};

Preloader.prototype.preload = function() {
  this.game.stage.backgroundColor = PRELOADER_BACKGROUND;
  var logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5);
  logo.scale.setTo(3);
};

Preloader.prototype.create = function() {

};
