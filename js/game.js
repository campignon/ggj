var Game = function() {};

// Function for creating a game
Game.prototype.createGame = function() {
  this.game = new Phaser.Game(1280, 720,
      Phaser.AUTO,
      '',
      this,
			false, // transparent background
			false // no antialias !
		);

    // States
    this.game.state.add('Booter', Booter);
    this.game.state.add('Preloader', Preloader);
    //this.game.state.add('MainMenu', );
    //this.game.state.add('Scene', );

    this.game.state.start('Booter');
};
