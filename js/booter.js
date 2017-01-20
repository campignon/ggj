var Booter = function() {};

Booter.prototype.preload = function() {

};

Booter.prototype.create = function() {
  this.game.stage.backgroundColor = '#29ADFF';
  this.state.start('Preloader');
};
