var MainMenu = function() {};

var pad1, pad2;
var introMusic;

MainMenu.prototype.create = function() {

  // Adding the logo on screen
  var logo = this.add.sprite(0, 0, 'title');
  logo.animations.add('walk');
  logo.animations.play('walk', 10, true);
  //logo.anchor.setTo(0.5);
  //logo.scale.setTo(MAIN_MENU_LOGO_SCALE_FACTOR);

  // Creating the "Play" button
  this.createButton('', this.game.world.centerX, this.game.world.centerY
  + MAIN_MENU_PLAY_BUTTON_OFFSET_Y, MAIN_MENU_PLAY_BUTTON_WIDTH,
  MAIN_MENU_PLAY_BUTTON_HEIGHT,
  function() {

      this.state.start('Scene');
      introMusic.stop();
    });

  pad1 = this.input.gamepad.pad1;
  pad2 = this.input.gamepad.pad2;
  this.input.gamepad.start();
  console.log(pad1);
  console.log(pad2);

  introMusic = this.add.audio('intro_theme');
  introMusic.loop = true;
  introMusic.play();
};

MainMenu.prototype.update = function() {
  if (pad1.justReleased(Phaser.Gamepad.XBOX360_A)
    || pad2.justReleased(Phaser.Gamepad.XBOX360_A)) {
    this.state.start('Scene');
    introMusic.stop();
  }
};

MainMenu.prototype.createButton = function(string, x, y, w, h, callback) {
  var playButton = this.game.add.button(x, y, 'playButton', callback, this, 2, 1, 0);
  playButton.anchor.setTo(0.5, 0.5);
  playButton.width = w;
  playButton.height = h;
  playButton.animations.add('anim');
  playButton.animations.play('anim', 12, true);

  var playButtonTxt = this.game.add.text(playButton.x, playButton.y, string,
    {
      font: MAIN_MENU_PLAY_BUTTON_FONT_SIZE + " " + MAIN_MENU_PLAY_BUTTON_FONT_FAMILY,
      fill: MAIN_MENU_PLAY_BUTTON_TEXT_COLOR,
      align:"center"
    });
  playButtonTxt.anchor.setTo(0.5, 0.5);
};
