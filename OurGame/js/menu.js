var menuState = {
	
	create: function() {
		menuMusic = game.add.audio('Menu');
		menuMusic.play();
		var nameLabel = game.add.text(80, 80, 'Player1',
									{ font: '50px Arial', fill: '#ffffff' });
									
		var instructions = game.add.text(40, 170, 'Reach the other player and jump into each',
									{ font: '24px Arial', fill: '#ffffff' });		
		var instructions2 = game.add.text(40, 200, "other's front side to initiate a powerful high-five!",
									{ font: '24px Arial', fill: '#ffffff' });
		var instructions3 = game.add.text(40, 250, 'Move with WASD.',
									{ font: '24px Arial', fill: '#ffffff' });
		var instructions4 = game.add.text(40, 280, 'Jump with W. Duck with S.',
									{ font: '24px Arial', fill: '#ffffff' });
		var instructions5 = game.add.text(40, 330, 'Watch out for red guys!',
									{ font: '24px Arial', fill: '#ffffff' });
									
		var startLabel = game.add.text(80, game.world.height-80, 
									'press "W" to start',
									{font: '25px Arial', fill: '#ffffff' });
									
		var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.start, this);
		
	},
	
	start: function() {
		menuMusic.stop();
		game.state.start('play');
	}
};

var menuState2 = {
	
	create: function() {
		var nameLabel = game2.add.text(80, 80, 'Player2',
									{ font: '50px Arial', fill: '#ffffff' });
									
		var startLabel = game2.add.text(40, game2.world.height-80, 
									'press "W" to start',
									{font: '25px Arial', fill: '#ffffff' });
		var instructions = game2.add.text(40, 170, 'Reach the other player and jump into each',
									{ font: '24px Arial', fill: '#ffffff' });		
		var instructions2 = game2.add.text(40, 200, "other's front side to initiate a powerful high-five!",
									{ font: '24px Arial', fill: '#ffffff' });
		var instructions3 = game2.add.text(40, 250, 'Move with the Arrow Keys.',
									{ font: '24px Arial', fill: '#ffffff' });
		var instructions4 = game2.add.text(40, 280, 'Jump with Up. Duck with Down.',
									{ font: '24px Arial', fill: '#ffffff' });
		var instructions5 = game2.add.text(40, 330, 'Watch out for red guys!',
									{ font: '24px Arial', fill: '#ffffff' });

									
		var wkey = game2.input.keyboard.addKey(Phaser.Keyboard.W);
		
		wkey.onDown.addOnce(this.start, this);
		
	},
	
	start: function() {
		game2.state.start('play2');
	}
};