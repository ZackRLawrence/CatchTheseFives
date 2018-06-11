var loadState = {
	
	preload: function() {
		
		var loadingLabel = game.add.text(80,150, 'loading...',
									{font: '30px Courier;', fill: '#fffff'});
		
		
		this.load.image('player1', 'assets/img/player1.png');
		this.load.image('player2', 'assets/img/player2.png');
		this.load.image('player1_proj', 'assets/img/player1_proj.png');
		this.load.image('player2_proj', 'assets/img/player2_proj.png');
		this.load.image('logo', 'assets/img/logo.png');
		this.load.image('enemy', 'assets/img/enemy.png');
		this.load.image('box', 'assets/img/cardboard_box.png');
		this.load.image('win', 'assets/img/win.png');
		this.load.image('floor', 'assets/img/floor.png');
		this.load.image('lunch', 'assets/img/breakRoomSmall.png');
		this.load.image('screenDivider', 'assets/img/ScreenBarrier.png');
		this.load.atlas('dude', 'assets/img/inkRun.png', 'assets/img/inkRun.json');
		this.load.audio('jump', 'assets/audio/Jump.wav'); // sound effect made by Zack
		this.load.audio('crash', 'assets/audio/Ragamama.mp3'); //Music: http://www.purple-planet.com
		this.load.audio('Menu', 'assets/audio/Playdate.wav'); //Menu theme. Music: http://www.purple-planet.com
		this.load.audio('Buddy', 'assets/audio/bensound-buddy.mp3') // Main theme. Music: www.bensound.com
		this.load.audio('Explosion', 'assets/audio/Explosion.mp3'); //sound that plays if collision occurs. Found at https://www.youtube.com/watch?v=UdNBLnuRICQ
		this.load.audio('High_Five', 'assets/audio/High_Five.mp3');
		
	},
	
	create: function() {
		jump = this.add.audio('jump');
		this.state.start('menu');
	}
};

var loadState2 = {
	
	preload: function() {
		
		var loadingLabel = game2.add.text(80,150, 'loading...',
									{font: '30px Courier;', fill: '#fffff'});
		
		
		this.load.image('player1', 'assets/img/player1.png');
		this.load.image('player2', 'assets/img/player2.png');
		this.load.image('player1_proj', 'assets/img/player1_proj.png');
		this.load.image('player2_proj', 'assets/img/player2_proj.png');
		this.load.image('logo', 'assets/img/logo.png');
		this.load.image('enemy', 'assets/img/enemy.png');
		this.load.image('win', 'assets/img/win.png');
		this.load.image('floor', 'assets/img/floor.png');
		this.load.image('lunch', 'assets/img/breakRoomSmall.png');
		this.load.image('screenDivider', 'assets/img/ScreenBarrier.png');
		this.load.atlas('dude', 'assets/img/inkRun.png', 'assets/img/inkRun.json');
		this.load.audio('jump', 'assets/audio/Jump.wav'); // sound effect made by me
		this.load.audio('crash', 'assets/audio/Ragamama.mp3'); //in case game crashes
		
	},
	
	create: function() {
		jump = this.add.audio('jump');
		this.state.start('menu2');
	}
};