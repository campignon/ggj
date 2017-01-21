var MainMenu = function() {};

MainMenu.prototype.create = function() {

  // Adding the logo on screen
  var logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
  logo.anchor.setTo(0.5);
  logo.scale.setTo(3);

  // Creating the "Play" button
  this.createButton("Play", this.game.world.centerX, this.game.world.centerY + 300,
    300, 100, function() {
      this.state.start('Scene');
    });
};

MainMenu.prototype.update = function() {

};

MainMenu.prototype.createButton = function(string, x, y, w, h, callback) {
  var playButton = this.game.add.button(x, y, 'playButton', callback, this, 2, 1, 0);
  playButton.anchor.setTo(0.5, 0.5);
  playButton.width = w;
  playButton.height = h;

  var playButtonTxt = this.game.add.text(playButton.x, playButton.y, string,
    {
      font:"14px Arial",
      fill:"#fff",
      align:"center"
    });
  playButtonTxt.anchor.setTo(0.5, 0.5);
};
