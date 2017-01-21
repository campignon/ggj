var Healthbar = function(game, id, healthBarX, healthBarY) {
  this.bar = game.add.sprite(healthBarX, healthBarY, 'healthbar');
  this.scoreText;
  this.id = id;
  this.rectangle = new Rectangle(0, 0, HEALTH_BAR_WIDTH, 100);

  if(id==2) {
    this.bar.scale.x *= -1;
  }
  this.bar.animations.add('walk');
  this.bar.animations.play('walk', 23, true);

  var playerNameTextSettings = {
    font: '24px uni0553',
    fill: '#fff',
    align: 'left'
  };
  var playerNameText = game.add.text(0, 0, 'Player ' + id, playerNameTextSettings);

  if (id == 1) {
    playerNameText.alignTo(this.bar, Phaser.BOTTOM_LEFT, -10, 0);
  } else {
    playerNameText.alignTo(this.bar, Phaser.BOTTOM_LEFT, 120, 0);
  }
};

Healthbar.prototype.initHealth = function(game, maxHealth) {
  var scoreSettings = {
    font: '36px uni0553',
    fill: '#fff',
    align: 'center'
  };
  this.scoreText = game.add.text(0, 0, maxHealth, scoreSettings);
  if (this.id == 1) {
    this.scoreText.alignTo(this.bar, Phaser.BOTTOM_RIGHT, -5, 0);
  } else {
    this.scoreText.alignTo(this.bar, Phaser.BOTTOM_RIGHT, 60, 0);
  }
};

Healthbar.prototype.updateHealth = function(health) {
  if (this.id == 1) {

  } else {

  }
  this.scoreText.setText(health);
};
