var Player = function(game, id, x, y, spriteName, healthbar, menu) {

  Phaser.Sprite.call(this, game, x, y, spriteName);
  this.game = game;
  this.name = spriteName;
  this.state = WAIT;
  this.currentWave = 0;
  this.canSelectWave = true;
  this.menu = menu;
  this.healthbar = healthbar;
  this.getCurrentWave().setState(WAVE_SELECTED);
  this.animations.frame = 0;

  this.wait = this.animations.add('wait', [0,1]);
  this.wait = this.animations.add('weakhit', [14,15,16,17]);
  this.wait = this.animations.add('defense', [10,11,12,13]);
  this.wait = this.animations.add('stronghit', [2,3,4,5,6,7,8,9]);

  this.animations.play('wait', 6, true);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.healthbar.updateHealth();
};

Player.prototype.updateAnimation = function () {

  if(this.getCurrentWave().state == WAVE_DEFAULT || this.getCurrentWave().state == WAVE_SELECTED) {
    this.state = WAIT;
    this.animations.play('wait', 6, true);
    console.log('animation attente');

  } else if (this.getCurrentWave().state == WAVE_ACTIVE) {

    if(this.getCurrentWave().type == ATK) {

      this.animations.play('stronghit', 6, true);
      console.log('animation attaque');

    } else if (this.getCurrentWave().type == DEF) {

      this.animations.play('defense', 6, true);
      console.log('animation defense');
    }

  }

};

Player.prototype.setPreviousWave = function() {
  this.getCurrentWave().setState(WAVE_DEFAULT);
  if (this.currentWave > 0) {
    this.currentWave -= 1;
  } else {
    this.currentWave = this.menu.waves.length - 1;

  }
  this.getCurrentWave().setState(WAVE_SELECTED);
  console.log("previous wave selected : " + this.currentWave);
};

Player.prototype.setNextWave = function() {
  this.getCurrentWave().setState(WAVE_DEFAULT);
  if (this.currentWave < this.menu.waves.length - 1) {
    this.currentWave += 1;
  } else {
    this.currentWave = 0;
  }
  this.getCurrentWave().setState(WAVE_SELECTED);
  console.log("next wave selected : " + this.currentWave);
};

Player.prototype.getCurrentWave = function() {
  return this.menu.waves[this.currentWave];
};

Player.prototype.startPlayerActions = function(player, opponent) {
  setInterval(function() {
    var currentWave = player.getCurrentWave();
    console.log(currentWave.state + ", " + currentWave.type);
    if (currentWave.state == WAVE_ACTIVE && currentWave.type == ATK) {
      console.log("Attacking !!!");
      opponent.healthbar.removeLife(currentWave.actualValue);
    }
  }, PLAYER_ACTIONS_INTERVAL);
};
