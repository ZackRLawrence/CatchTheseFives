var loadState = {
	
	preload: function() {
		
		var loadingLabel = game.add.text(80,150, 'loading...',
									{font: '30px Courier;', fill: '#fffff'});
		
		
		game.load.image('player1', 'assets/img/player1.png');
		game.load.image('player2', 'assets/img/player2.png');
		game.load.image('win', 'assets/img/win.png');
		game.load.image('floor', 'assets/img/floor.png');
		game.load.audio('jump', 'assets/audio/Jump.wav'); // sound effect made by me
		game.load.audio('crash', 'assets/audio/CRASH.wav'); //in case game crashes
		
	},
	
	create: function() {
		jump = game.add.audio('jump');
		game.state.start('menu');
	}
};