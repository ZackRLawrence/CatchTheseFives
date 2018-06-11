var loadState = {
	
	preload: function() {
		
		var loadingLabel = this.add.text(80,150, 'Loading, \n please wait...',
									{font: '50px Courier', fill: '#ffffff'});
		
		this.load.image('player1', 'assets/img/player1.png');
		this.load.image('player2', 'assets/img/player2.png');
		this.load.image('player1_proj', 'assets/img/player1_proj.png');
		this.load.image('player2_proj', 'assets/img/player2_proj.png');
		this.load.image('logo', 'assets/img/logo.png');
		this.load.image('enemy', 'assets/img/enemy.png');
		this.load.image('printer', 'assets/img/printer.png');
		this.load.image('table', 'assets/img/table.png');
		this.load.image('water_cooler', 'assets/img/water_cooler.png');
		this.load.image('coworker', 'assets/img/coworker.png');
		this.load.image('box', 'assets/img/cardboard_box.png');
		this.load.image('win', 'assets/img/win.png');
		this.load.image('wall', 'assets/img/wall.png');
		this.load.image('wallBroken', 'assets/img/wallBk.png');
		this.load.image('floor', 'assets/img/floor.png');
		this.load.image('workBackGround', 'assets/img/bRoomLS.png');
		this.load.image('screenDivider', 'assets/img/ScreenBarrier.png');
		this.load.atlas('dude', 'assets/img/inkRun.png', 'assets/img/inkRun.json');
		this.load.audio('jump', 'assets/audio/Jump.wav'); // sound effect made by Zack
		this.load.audio('crash', 'assets/audio/Ragamama.mp3'); //Music: http://www.purple-planet.com
		this.load.audio('Menu', 'assets/audio/Playdate.wav'); //Menu theme. Music: http://www.purple-planet.com
		this.load.audio('Cubicle', 'assets/audio/Cubicle.mp3') // Theme by Matthew Reed
		this.load.audio('Explosion', 'assets/audio/Explosion.mp3'); //sound that plays if collision occurs. Found at https://www.youtube.com/watch?v=UdNBLnuRICQ
		this.load.audio('High_Five', 'assets/audio/High_Five.mp3');
		this.load.audio('clock', 'assets/audio/clock.wav');
	},
	
	create: function() {
		jump = this.add.audio('jump');
		this.state.start('menu');
	}
};

var loadState2 = {
	
	
	preload: function() {
		
		var loadingLabel = this.add.text(80,150, 'Loading, \n please wait...',
									{font: '50px Courier', fill: '#ffffff'});
		
		
		this.load.image('player1', 'assets/img/player1.png');
		this.load.image('player2', 'assets/img/player2.png');
		this.load.image('player1_proj', 'assets/img/player1_proj.png');
		this.load.image('player2_proj', 'assets/img/player2_proj.png');
		this.load.image('logo', 'assets/img/logo.png');
		this.load.image('enemy', 'assets/img/enemy.png');
		this.load.image('printer', 'assets/img/printer.png');
		this.load.image('table', 'assets/img/table.png');
		this.load.image('water_cooler', 'assets/img/water_cooler.png');
		this.load.image('coworker', 'assets/img/coworker.png');
		this.load.image('box', 'assets/img/cardboard_box.png');
		this.load.image('win', 'assets/img/win.png');
		this.load.image('wall', 'assets/img/wall.png');
		this.load.image('wallBroken', 'assets/img/wallBk.png');
		this.load.image('floor', 'assets/img/floor.png');
		this.load.image('workBackGround', 'assets/img/bRoomLS.png');
		this.load.image('screenDivider', 'assets/img/ScreenBarrier.png');
		this.load.atlas('dude', 'assets/img/inkRun.png', 'assets/img/inkRun.json');
		this.load.audio('jump', 'assets/audio/Jump.wav'); // sound effect made by me
		this.load.audio('crash', 'assets/audio/Ragamama.mp3'); //in case game crashes
		
	},
	
	create: function() {
		this.state.start('menu2');
	}
};