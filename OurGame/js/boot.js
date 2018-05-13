var bootState = {
	create: function() {
		game.physics.startSystem(Phaser.Physics.P2JS);
		
		game.state.start('load');
	}
};

var bootState2 = {
	create: function() {
		game2.physics.startSystem(Phaser.Physics.ARCADE);
		
		game2.state.start('load2');
	}
};

