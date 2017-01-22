var Healthbar = function(game, scene, id, healthBarX, healthBarY, totalLife) {
  this.scene = scene;
  this.bar = game.add.sprite(healthBarX, healthBarY, 'healthbar');
  this.lifeText = game.add.text(0, 0, totalLife, {
    font: LIFE_FONT_SIZE + ' ' + LIFE_FONT_FAMILY,
    fill: LIFE_TEXT_COLOR,
    align: 'center'
  });
  this.id = id;
  this.totalLife = totalLife;
  this.currentLife = totalLife;
  this.oldCurrentLife = totalLife;
  this.healthBarX = healthBarX;
  this.cropRect = new Phaser.Rectangle(0, 0, HEALTH_BAR_WIDTH, HEALTH_BAR_HEIGHT);
  this.bar.crop(this.cropRect);
  this.bar.animations.add('walk');
  this.bar.animations.play('walk', 23, true);

  // si c'est le player2 on fait un mirroir
  if(id==2) {this.bar.scale.x *= -1;}

  var playerNameTextSettings = {
    font: PLAYER_NAME_FONT_SIZE + ' ' + PLAYER_NAME_FONT_FAMILY,
    fill: PLAYER_NAME_TEXT_COLOR,
    align: 'left'
  };
  var playerNameText = game.add.text(0, 0, 'Player ' + id, playerNameTextSettings);
  playerNameText.y = this.lifeText.y = HEALTH_BAR_HEIGHT;

  if (id == 1) {
    playerNameText.x = 15;
    this.lifeText.x = HEALTH_BAR_WIDTH-this.lifeText.width;
  } else {
    playerNameText.x = game.world.width-playerNameText.width-15;
    this.lifeText.x = game.world.width-HEALTH_BAR_WIDTH;
  }
};

Healthbar.prototype.setLife = function(value) {
  this.currentLife = value;
}

Healthbar.prototype.removeLife = function(value) {
  if (this.currentLife >= value) {
    this.currentLife -= value;
  } else {
    this.currentLife = 0;
    this.scene.gameOver();
  }
}

Healthbar.prototype.updateHealth = function(health) {

  if(this.oldCurrentLife != this.currentLife) {
    this.oldCurrentLife = this.currentLife;

    this.lifeText.setText(this.currentLife);

    var healthsize = (HEALTH_BAR_WIDTH*this.currentLife)/this.totalLife;
    this.cropRect.width = healthsize;
    this.bar.crop(this.cropRect);
    if (this.id == 1) {
      this.bar.x = this.healthBarX + (HEALTH_BAR_WIDTH-healthsize);
    } else {
      this.bar.x = this.healthBarX - (HEALTH_BAR_WIDTH-healthsize);
    }

  }

};
