var currentTime;
var countdownText;

var Countdown = function(game, scene, duration) {
  this.scene = scene;
  this.timer = null;

  var countdownSprite = game.add.sprite(game.world.centerX, 0, null);
  countdownSprite.anchor.setTo(0.5, 0);

  currentTime = DURATION;
  countdownText = game.add.text(0, 0, currentTime, {
    font: COUNTDOWN_FONT_SIZE + " " + COUNTDOWN_FONT_FAMILY,
    fill: COUNTDOWN_TEXT_COLOR,
    align: "center"
  });
  countdownText.setShadow(COUNTDOWN_TEXT_SHADOW_X,
    COUNTDOWN_TEXT_SHADOW_Y, COUNTDOWN_TEXT_SHADOW_COLOR, COUNTDOWN_TEXT_SHADOW_BLUR);

  countdownSprite.addChild(countdownText);
  countdownText.anchor.setTo(0.5, 0);
};

Countdown.prototype.start = function(game) {
  console.log("start timer");
  this.timer = game.time.events.loop(1000, this.update, this);
};

Countdown.prototype.update = function() {
  if (currentTime > 0) {
    currentTime -= 1;
    countdownText.setText(currentTime);

    if (currentTime == 0) {
      // End game
      this.scene.gameOver(0);
    }
  }
};

Countdown.prototype.stop = function(game) {
  game.time.events.remove(this.timer);
};
