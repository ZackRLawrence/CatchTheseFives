var menuState = {
	
	create: function() {
		var nameLabel = game.add.text(80, 80, 'Player1',
									{ font: '50px Arial', fill: '#ffffff' });
									
		var startLabel = game.add.text(80, game.world.height-80, 
									'press "W" to start',
									{font: '25px Arial', fill: '#ffffff' });
									
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.start, this);
		
	},
	
	start: function() {
		game.state.start('play');
	}
};

var menuState2 = {
	
	create: function() {
		var nameLabel = game2.add.text(80, 80, 'Player2',
									{ font: '50px Arial', fill: '#ffffff' });
									
		var startLabel = game2.add.text(80, game2.world.height-80, 
									'press "W" to start',
									{font: '25px Arial', fill: '#ffffff' });
									
		var wkey = game2.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.start, this);
		
	},
	
	start: function() {
		game2.state.start('play2');
	}
};