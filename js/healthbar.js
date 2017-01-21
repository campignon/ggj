var Healthbar = function(game, id, healthBarX, healthBarY) {
  var bar = game.add.sprite(healthBarX, healthBarY, 'healthbar');
  if(id==2) {
    bar.scale.x *= -1;
  }
  bar.animations.add('walk');
  bar.animations.play('walk', 23, true);

  var playerNameText = game.add.text(0, 0, 'Player ' + id, {
    font: '32px uni0553',
    fill: '#fff',
    align: 'left'
  });
  if (id == 1) {
    playerNameText.alignTo(bar, Phaser.BOTTOM_LEFT, -10, 0);
  }
  else {
    playerNameText.alignTo(bar, Phaser.BOTTOM_LEFT, 150, 0);
  }
};
