var Player = function(game, id, x, y, spriteName, healthbar, menu, state) {

  Phaser.Sprite.call(this, game, x, y, spriteName);
  this.name = spriteName;
  this.state = state;
  this.currentWave = 0;
  this.canSelectWave = true;
  this.menu = menu;
  this.healthbar = healthbar;
  this.getCurrentWave().setState(WAVE_SELECTED);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  this.healthbar.updateHealth();
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
