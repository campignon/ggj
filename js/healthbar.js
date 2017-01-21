var Healthbar = function(game, id, healthBarX, healthBarY) {
  var bar = game.add.sprite(healthBarX, healthBarY, 'healthbar');
  if(id==2) {
    bar.scale.x *= -1;
  }
  bar.animations.add('walk');
  bar.animations.play('walk', 23, true);
};
