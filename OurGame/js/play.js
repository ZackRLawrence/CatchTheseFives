var playState = { 

	create: function() {
		crash = game.add.audio('crash');
		crash.play();
		game.world.setBounds(0, 0, 3000, 480);
		this.keyboard = game.input.keyboard;
		cursors = game.input.keyboard.createCursorKeys();
		
		ground = game.add.group();
		ground.enableBody = true;

		floor = ground.create(0, game.world.height - 64, 'floor');
		//floor.enableBody = true;
		floor.scale.setTo(30, 2);
		floor.body.immovable = true;

		//Player 1 Variables
		this.player1 = game.add.sprite(16, 16, 'player1');
		game.physics.enable(this.player1, Phaser.Physics.ARCADE);
		this.player1.body.gravity.y = 300;
		this.player1.body.maxVelocity.x = 250;
		this.player1.body.collideWorldBounds = true;
		this.player1.scale.setTo(1, -2);
		
		//Player 2 Variables
		this.player2 = game.add.sprite(game.world.width - 32, 16, 'player2');
		game.physics.enable(this.player2, Phaser.Physics.ARCADE);
		this.player2.body.gravity.y = 300;
		this.player2.body.maxVelocity.x = 250;
		this.player2.body.collideWorldBounds = true;
		this.player2.scale.setTo(1, -2);

		this.win = game.add.sprite(256, 256, 'win');
		game.physics.enable(this.win, Phaser.Physics.ARCADE);
		//game.physics.arcade.collide(this.player1, floor);
		
		game.camera.follow(this.player1);
		
		crash.stop();
		
	},
	
	update: function() {
		crash.play();
		game.physics.arcade.collide(this.player1, ground);
		game.physics.arcade.overlap(this.player1, this.win, this.Win, null, this);
		game.physics.arcade.collide(this.player2, ground);
		game.physics.arcade.overlap(this.player2, this.win, this.Win, null, this);
		var Five = game.physics.arcade.collide(this.player1, this.player2);
		
		if(Five == true){
			this.player1.body.velocity.x = -1000;
			this.player2.body.velocity.x = 1000;
			this.player1.body.velocity.y = -100;
			this.player2.body.velocity.y = -100;
		}
		
		
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
			//this.player1.body.velocity.y = 175;
			this.player1.scale.setTo(1, -1);
		} else {
			this.player1.scale.setTo(1, -2);
			//this.player1.body.velocity.y = 0;
		}
		
		
		if(cursors.left.isDown && !cursors.down.isDown){
			this.player2.body.acceleration.x = -300;
			if(this.player2.body.velocity.x < 100 && this.player2.body.velocity.x > 0){
				this.player2.body.velocity.x = 0;
			}
		} else if(cursors.right.isDown && !cursors.down.isDown){
			this.player2.body.acceleration.x = 300;
			if(this.player2.body.velocity.x < 0 && this.player2.body.velocity.x > -100){
				this.player2.body.velocity.x = 0;
			}
		} else if(cursors.down.isDown) {
			if(this.player2.body.velocity.x > 0)
				this.player2.body.acceleration.x = this.player2.body.acceleration.x - 25;
			if(this.player2.body.velocity.x < 0)
				this.player2.body.acceleration.x = this.player2.body.acceleration.x + 25;
			if(this.player2.body.velocity.x < 25 && this.player2.body.velocity.x > -25){
				this.player2.body.acceleration.x = 0;
				this.player2.body.velocity.x = 0;
			}
		} else {
			if(this.player2.body.velocity.x > 0)
				this.player2.body.acceleration.x = this.player2.body.acceleration.x - 35;
			if(this.player2.body.velocity.x < 0)
				this.player2.body.acceleration.x = this.player2.body.acceleration.x + 35;
			if(this.player2.body.velocity.x < 50 && this.player2.body.velocity.x > -50){
				this.player2.body.acceleration.x = 0;
				this.player2.body.velocity.x = 0;
			}
		}
		
		if(cursors.up.isDown && this.player2.body.touching.down){
			this.player2.body.velocity.y = -175;
			jump.play();
		} else if(cursors.down.isDown && this.player2.body.touching.down){
			//this.player2.body.velocity.y = 175;
			this.player2.scale.setTo(1, -1);
		} else {
			this.player2.scale.setTo(1, -2);
			//this.player1.body.velocity.y = 0;
		}
		
		crash.stop();
	},
	/*
	render: function() {

		game.debug.cameraInfo(game.camera, 32, 32);
		game.debug.spriteCoords(player, 32, 500);

	},
	*/
	Win: function() {
		game.state.start('win');
	}
};

var playState2 = { 

	create: function() {
		crash = game2.add.audio('crash');
		crash.play();
		game2.world.setBounds(0, 0, 3000, 480);
		this.keyboard = game2.input.keyboard;
		cursors = game2.input.keyboard.createCursorKeys();
		
		ground = game2.add.group();
		ground.enableBody = true;

		floor = ground.create(0, game2.world.height - 64, 'floor');
		//floor.enableBody = true;
		floor.scale.setTo(30, 2);
		floor.body.immovable = true;

		//Player 1 Variables
		this.player1 = game2.add.sprite(16, 16, 'player1');
		game2.physics.enable(this.player1, Phaser.Physics.ARCADE);
		this.player1.body.gravity.y = 300;
		this.player1.body.maxVelocity.x = 250;
		this.player1.body.collideWorldBounds = true;
		this.player1.scale.setTo(1, -2);
		
		//Player 2 Variables
		this.player2 = game2.add.sprite(game2.world.width - 32, 16, 'player2');
		game2.physics.enable(this.player2, Phaser.Physics.ARCADE);
		this.player2.body.gravity.y = 300;
		this.player2.body.maxVelocity.x = 250;
		this.player2.body.collideWorldBounds = true;
		this.player2.scale.setTo(1, -2);

		this.win = game2.add.sprite(256, 256, 'win');
		game2.physics.enable(this.win, Phaser.Physics.ARCADE);
		//game2.physics.arcade.collide(this.player1, floor);
		
		game2.camera.follow(this.player2);
		crash.stop();
		
	},
	
	update: function() {
		crash.play();
		game2.physics.arcade.collide(this.player1, ground);
		game2.physics.arcade.overlap(this.player1, this.win, this.Win, null, this);
		game2.physics.arcade.collide(this.player2, ground);
		game2.physics.arcade.overlap(this.player2, this.win, this.Win, null, this);
		var Five = game2.physics.arcade.collide(this.player1, this.player2);
		
		if(Five == true){
			this.player1.body.velocity.x = -1000;
			this.player2.body.velocity.x = 1000;
			this.player1.body.velocity.y = -100;
			this.player2.body.velocity.y = -100;
		}
		
		
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
			//this.player1.body.velocity.y = 175;
			this.player1.scale.setTo(1, -1);
		} else {
			this.player1.scale.setTo(1, -2);
			//this.player1.body.velocity.y = 0;
		}
		
		
		if(cursors.left.isDown && !cursors.down.isDown){
			this.player2.body.acceleration.x = -300;
			if(this.player2.body.velocity.x < 100 && this.player2.body.velocity.x > 0){
				this.player2.body.velocity.x = 0;
			}
		} else if(cursors.right.isDown && !cursors.down.isDown){
			this.player2.body.acceleration.x = 300;
			if(this.player2.body.velocity.x < 0 && this.player2.body.velocity.x > -100){
				this.player2.body.velocity.x = 0;
			}
		} else if(cursors.down.isDown) {
			if(this.player2.body.velocity.x > 0)
				this.player2.body.acceleration.x = this.player2.body.acceleration.x - 25;
			if(this.player2.body.velocity.x < 0)
				this.player2.body.acceleration.x = this.player2.body.acceleration.x + 25;
			if(this.player2.body.velocity.x < 25 && this.player2.body.velocity.x > -25){
				this.player2.body.acceleration.x = 0;
				this.player2.body.velocity.x = 0;
			}
		} else {
			if(this.player2.body.velocity.x > 0)
				this.player2.body.acceleration.x = this.player2.body.acceleration.x - 35;
			if(this.player2.body.velocity.x < 0)
				this.player2.body.acceleration.x = this.player2.body.acceleration.x + 35;
			if(this.player2.body.velocity.x < 50 && this.player2.body.velocity.x > -50){
				this.player2.body.acceleration.x = 0;
				this.player2.body.velocity.x = 0;
			}
		}
		
		if(cursors.up.isDown && this.player2.body.touching.down){
			this.player2.body.velocity.y = -175;
			jump.play();
		} else if(cursors.down.isDown && this.player2.body.touching.down){
			//this.player2.body.velocity.y = 175;
			this.player2.scale.setTo(1, -1);
		} else {
			this.player2.scale.setTo(1, -2);
			//this.player1.body.velocity.y = 0;
		}
		
		crash.stop();
	},
	
	Win: function() {
		game2.state.start('win2');
	}
};