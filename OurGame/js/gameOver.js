var gameOverState = {
	
	create: function() {
		crash = game.add.audio('crash');
		crash.play();
		var winLabel = game.add.text(310, 80, 'GAME OVER!',
									{ font: '100px Courier', fill: '#ffffff' });
									
		var startLabel = game.add.text(440, game.world.height-80, 
									'press "W" to restart',
									{font: '25px Courier', fill: '#ffffff' });
									
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
		var winLabel = game2.add.text(-290, 80, 'GAME OVER!',
									{ font: '100px Courier', fill: '#ffffff' });
									
		var startLabel = game2.add.text(-160, game2.world.height-80, 
									'press "W" to restart',
									{font: '25px Courier', fill: '#ffffff' });
									
		var wkey = game2.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.restart, this);
		
	},
	
	restart: function() {
		game2.state.start('menu2');
	}
};