var currentTime;
var countdownText;

var Countdown = function(game, duration) {
  var countdownSprite = game.add.sprite(game.world.centerX, 0, 'timer');
  countdownSprite.anchor.setTo(0.53, 0);

  currentTime = DURATION;
  countdownText = game.add.text(0, 0, currentTime, {
    font: COUNTDOWN_FONT_SIZE + " " + COUNTDOWN_FONT_FAMILY,
    fill: COUNTDOWN_TEXT_COLOR,
    align: "center"
  });
  countdownSprite.addChild(countdownText);
  countdownText.anchor.setTo(0.5, 0);
};

Countdown.prototype.start = function(game) {
  console.log("start timer");
  game.time.events.loop(1000, this.update, this);
};

Countdown.prototype.update = function() {
  currentTime -= 1;
  countdownText.setText(currentTime);

  if (currentTime == 0) {
    // End game
  }
};