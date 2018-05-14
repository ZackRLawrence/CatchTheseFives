var gameOverState = {
	
	create: function() {
		crash = game.add.audio('crash');
		crash.play();
		var winLabel = game.add.text(80, 80, 'GAME OVER!',
									{ font: '50px Arial', fill: '#00FF00' });
									
		var startLabel = game.add.text(80, game.world.height-80, 
									'press "W" to restart',
									{font: '25px Arial', fill: '#ffffff' });
									
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.restart, this);
		
	},
	
	restart: function() {
		crash.stop();
		game.state.start('menu');
	}
};

var gameOverState2 = {
	
	create: function() {
		var winLabel = game2.add.text(80, 80, 'GAME OVER!',
									{ font: '50px Arial', fill: '#00FF00' });
									
		var startLabel = game2.add.text(80, game2.world.height-80, 
									'press "W" to restart',
									{font: '25px Arial', fill: '#ffffff' });
									
		var wkey = game2.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.restart, this);
		
	},
	
	restart: function() {
		game2.state.start('menu2');
	}
};