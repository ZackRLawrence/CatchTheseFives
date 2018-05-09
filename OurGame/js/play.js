var playState = { 

	create: function() {
		crash = game.add.audio('crash');
		crash.play();
		this.keyboard = game.input.keyboard;
		
		ground = game.add.group();
		ground.enableBody = true;

		floor = ground.create(0, game.world.height - 64, 'floor');
		//floor.enableBody = true;
		floor.scale.setTo(4, 2);
		floor.body.immovable = true;

		
		this.player = game.add.sprite(16, 16, 'player');
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		//game.physics.arcade.enable(player);
		this.player.body.gravity.y = 300;
		this.player.body.collideWorldBounds = true;
		
		this.win = game.add.sprite(256, 256, 'win');
		game.physics.enable(this.win, Phaser.Physics.ARCADE);
		//game.physics.arcade.collide(this.player, floor);
		crash.stop();
		
	},
	
	update: function() {
		crash.play();
		var hitPlatform = game.physics.arcade.collide(this.player, floor);
		game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);
		
		if(this.keyboard.isDown(Phaser.Keyboard.A)){
			this.player.body.velocity.x = -175;
		} else if(this.keyboard.isDown(Phaser.Keyboard.D)){
			this.player.body.velocity.x = 175;
		} else {
			this.player.body.velocity.x = 0;
		}
		
		if(this.keyboard.isDown(Phaser.Keyboard.W) && this.player.body.touching.down){
			this.player.body.velocity.y = -175;
		} else if(this.keyboard.isDown(Phaser.Keyboard.S)){
			this.player.body.velocity.y = 175;
		} else {
			//this.player.body.velocity.y = 0;
		}
		crash.stop();
	},
	
	Win: function() {
		game.state.start('win');
	}
};