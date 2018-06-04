var loadState = {
	
	preload: function() {
		
		var loadingLabel = game.add.text(80,150, 'loading...',
									{font: '30px Courier;', fill: '#fffff'});
		
		
		game.load.image('player1', 'assets/img/player1.png');
		game.load.image('player2', 'assets/img/player2.png');
		game.load.image('player1_proj', 'assets/img/player1_proj.png');
		game.load.image('player2_proj', 'assets/img/player2_proj.png');
		game.load.image('enemy', 'assets/img/enemy.png');
		game.load.image('box', 'assets/img/cardboard box.png');
		game.load.image('win', 'assets/img/win.png');
		game.load.image('floor', 'assets/img/floor.png');
		game.load.audio('jump', 'assets/audio/Jump.wav'); // sound effect made by me
		game.load.audio('crash', 'assets/audio/CRASH.wav'); //in case game crashes. Found at https://www.youtube.com/watch?v=LGIHef7UD7w
		game.load.audio('Office', 'assets/audio/Office.mp3'); //main theme. Found at https://www.youtube.com/watch?v=jjFVkbOPM8Y
		game.load.audio('Explosion', 'assets/audio/Explosion.mp3'); //sound that plays if collision occurs. Found at https://www.youtube.com/watch?v=UdNBLnuRICQ
		game.load.audio('High_Five', 'assets/audio/High_Five.mp3');
		
	},
	
	create: function() {
		jump = game.add.audio('jump');
		game.state.start('menu');
	}
};

var loadState2 = {
	
	preload: function() {
		
		var loadingLabel = game2.add.text(80,150, 'loading...',
									{font: '30px Courier;', fill: '#fffff'});
		
		
		game2.load.image('player1', 'assets/img/player1.png');
		game2.load.image('player2', 'assets/img/player2.png');
		game2.load.image('player1_proj', 'assets/img/player1_proj.png');
		game2.load.image('player2_proj', 'assets/img/player2_proj.png');
		game2.load.image('enemy', 'assets/img/enemy.png');
		game2.load.image('win', 'assets/img/win.png');
		game2.load.image('floor', 'assets/img/floor.png');
		game2.load.audio('jump', 'assets/audio/Jump.wav'); // sound effect made by me
		game2.load.audio('crash', 'assets/audio/CRASH.wav'); //in case game crashes
		
	},
	
	create: function() {
		jump = game2.add.audio('jump');
		game2.state.start('menu2');
	}
};