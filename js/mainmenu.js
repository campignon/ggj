var MainMenu = function() {};

MainMenu.prototype.create = function() {

  // Adding the logo on screen
  var logo = this.add.sprite(0, 0, 'title');
  logo.animations.add('walk');
  logo.animations.play('walk', 10, true);
  //logo.anchor.setTo(0.5);
  //logo.scale.setTo(MAIN_MENU_LOGO_SCALE_FACTOR);

  // Creating the "Play" button
  this.createButton(PLAY_BUTTON_TEXT, this.game.world.centerX, this.game.world.centerY
  + MAIN_MENU_PLAY_BUTTON_OFFSET_Y, MAIN_MENU_PLAY_BUTTON_WIDTH,
  MAIN_MENU_PLAY_BUTTON_HEIGHT,
  function() {

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
      font: MAIN_MENU_PLAY_BUTTON_FONT_SIZE + " " + MAIN_MENU_PLAY_BUTTON_FONT_FAMILY,
      fill: MAIN_MENU_PLAY_BUTTON_TEXT_COLOR,
      align:"center"
    });
  playButtonTxt.anchor.setTo(0.5, 0.5);
};
