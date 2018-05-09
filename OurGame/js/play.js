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

		
		this.player1 = game.add.sprite(16, 16, 'player1');
		game.physics.enable(this.player1, Phaser.Physics.ARCADE);
		//game.physics.arcade.enable(player1);
		this.player1.body.gravity.y = 300;
		this.player1.body.maxVelocity.x = 250;
		this.player1.body.collideWorldBounds = true;
		this.player1.scale.setTo(1, -2);
		

		this.win = game.add.sprite(256, 256, 'win');
		game.physics.enable(this.win, Phaser.Physics.ARCADE);
		//game.physics.arcade.collide(this.player1, floor);
		crash.stop();
		
	},
	
	update: function() {
		crash.play();
		var hitPlatform = game.physics.arcade.collide(this.player1, ground);
		game.physics.arcade.overlap(this.player1, this.win, this.Win, null, this);
		
		if(this.keyboard.isDown(Phaser.Keyboard.A) && !this.keyboard.isDown(Phaser.Keyboard.S)){
			this.player1.body.acceleration.x = -300;
			if(this.player1.body.velocity.x < 100 && this.player1.body.velocity.x > 0){
				this.player1.body.velocity.x = 0;
			}
		} else if(this.keyboard.isDown(Phaser.Keyboard.D) && !this.keyboard.isDown(Phaser.Keyboard.S)){
			this.player1.body.acceleration.x = 300;
			if(this.player1.body.velocity.x < 0 && this.player1.body.velocity.x > -100){
				this.player1.body.velocity.x = 0;
			}
		} else if(this.keyboard.isDown(Phaser.Keyboard.S)) {
			if(this.player1.body.velocity.x > 0)
				this.player1.body.acceleration.x = this.player1.body.acceleration.x - 25;
			if(this.player1.body.velocity.x < 0)
				this.player1.body.acceleration.x = this.player1.body.acceleration.x + 25;
			if(this.player1.body.velocity.x < 25 && this.player1.body.velocity.x > -25){
				this.player1.body.acceleration.x = 0;
				this.player1.body.velocity.x = 0;
			}
		} else {
			if(this.player1.body.velocity.x > 0)
				this.player1.body.acceleration.x = this.player1.body.acceleration.x - 35;
			if(this.player1.body.velocity.x < 0)
				this.player1.body.acceleration.x = this.player1.body.acceleration.x + 35;
			if(this.player1.body.velocity.x < 50 && this.player1.body.velocity.x > -50){
				this.player1.body.acceleration.x = 0;
				this.player1.body.velocity.x = 0;
			}
		}
		
		if(this.keyboard.isDown(Phaser.Keyboard.W) && this.player1.body.touching.down){
			this.player1.body.velocity.y = -175;
			jump.play();
		} else if(this.keyboard.isDown(Phaser.Keyboard.S) && this.player1.body.touching.down){
			this.player1.body.velocity.y = 175;
			this.player1.scale.setTo(1, -1);
		} else {
			this.player1.scale.setTo(1, -2);
			//this.player1.body.velocity.y = 0;
		}
		crash.stop();
	},
	
	Win: function() {
		game.state.start('win');
	}
};