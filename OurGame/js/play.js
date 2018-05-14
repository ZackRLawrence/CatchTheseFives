var playState = { 

	create: function() {
		crash = game.add.audio('crash');
		theme = game.add.audio('Office');
		explosion = game.add.audio('Explosion');
		crash.play();
		theme.play();
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
		this.player1 = game.add.sprite(16, 400, 'player1');
		game.physics.enable(this.player1, Phaser.Physics.ARCADE);
		this.player1.body.gravity.y = 300;
		this.player1.body.maxVelocity.x = 250;
		this.player1.body.collideWorldBounds = true;
		this.player1.scale.setTo(1, -2);
		
		//Player 1's projectile self
		this.player1_proj = game.add.sprite(0, 700, 'player1_proj');
		game.physics.enable(this.player1_proj, Phaser.Physics.ARCADE);
		this.player1_proj.enableBody = true;
		this.player1_proj.body.velocity.x = -500;
		this.player1_proj.body.collideWorldBounds = true;
		this.player1_proj.scale.setTo(1, -2);
		
		//Player 2 Variables
		this.player2 = game.add.sprite(game.world.width - 32, 400, 'player2');
		game.physics.enable(this.player2, Phaser.Physics.ARCADE);
		this.player2.body.gravity.y = 300;
		this.player2.body.maxVelocity.x = 250;
		this.player2.body.collideWorldBounds = true;
		this.player2.scale.setTo(1, -2);
		
		//Player 2's projectile self
		this.player2_proj = game.add.sprite(3000, 700, 'player2_proj');
		game.physics.enable(this.player2_proj, Phaser.Physics.ARCADE);
		this.player2_proj.enableBody = true;
		this.player2_proj.body.velocity.x = 500;
		this.player2_proj.body.collideWorldBounds = true;
		this.player2_proj.scale.setTo(1, -2);

		//this.win = game.add.sprite(256, 256, 'win');
		//game.physics.enable(this.win, Phaser.Physics.ARCADE);
		
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		this.enemy.create(200, 400, 'enemy');
		this.enemy.create(400, 370, 'enemy');
		this.enemy.create(600, 400, 'enemy');
		this.enemy.create(800, 400, 'enemy');
		this.enemy.create(1000, 370, 'enemy');
		this.enemy.create(1200, 400, 'enemy');
		this.enemy.create(1400, 370, 'enemy');
		this.enemy.create(1600, 370, 'enemy');
		this.enemy.create(1800, 400, 'enemy');
		this.enemy.create(2000, 370, 'enemy');
		this.enemy.create(2200, 400, 'enemy');
		this.enemy.create(2400, 370, 'enemy');
		this.enemy.create(2600, 400, 'enemy');
		this.enemy.create(2800, 400, 'enemy');
		
		//this.enemy = game.add.sprite(120, 400, 'enemy');
		//this.enemy = game.add.sprite(200, 375, 'enemy');
		//this.enemy = game.add.sprite(300, 400, 'enemy');
		game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		//game.physics.arcade.collide(this.player1, floor);
		
		game.camera.follow(this.player1_proj);
		
		crash.stop();
		
	},
	
	update: function() {
		crash.play();
		game.physics.arcade.collide(this.player1, ground);
		//game.physics.arcade.overlap(this.player1, this.win, this.Win, null, this);
		game.physics.arcade.collide(this.player2, ground);
		//game.physics.arcade.overlap(this.player2, this.win, this.Win, null, this);
		var Five = game.physics.arcade.collide(this.player1, this.player2);
		game.physics.arcade.overlap(this.player1, this.enemy, this.gameOver, null, this);
		game.physics.arcade.overlap(this.player2, this.enemy, this.gameOver, null, this);
		//if(Five == true){
		//	this.player1.body.velocity.x = -1000;
		//	this.player2.body.velocity.x = 1000;
		//	this.player1.body.velocity.y = -100;
		//	this.player2.body.velocity.y = -100;
		//}
		
		
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
		
		
		//High Five Movement
		if(this.player1.body.position.x == this.player2.body.position.x-16 && !this.player1.body.touching.down && !this.player2.body.touching.down){
			explosion.play();
			this.player1_proj.body.position.x = this.player1.body.position.x;
			this.player1_proj.body.position.y = this.player1.body.position.y;
			this.player1.body.position.x = 0;
			this.player1.body.position.y = 600;
			this.player1_proj.body.gravity.y = 0;
			this.player1_proj.body.velocity.x = -500;
			this.player1_proj.body.collideWorldBounds = true;
			this.player1_proj.scale.setTo(1, -2);
			this.player2_proj.body.position.x = this.player2.body.position.x;
			this.player2_proj.body.position.y = this.player2.body.position.y;
			this.player2.body.position.x = 3000;
			this.player2.body.position.y = 3000;
			this.player2_proj.body.gravity.y = 0;
			this.player2_proj.body.velocity.x = 500;
			this.player2_proj.body.collideWorldBounds = true;
			this.player2_proj.scale.setTo(1, -2);
		}
		
		//Moving the players back
		if(this.player1_proj.body.position.x == 0 && this.player1_proj.body.position.y < 400){
			this.player1.body.position.x = this.player1_proj.body.position.x;
			this.player1.body.position.y = this.player1_proj.body.position.y;
			this.player1_proj.body.position.x = 0;
			this.player1_proj.body.position.y = 700;
		}
		
		if(this.player2_proj.body.position.x > 2975 && this.player2_proj.body.position.y < 400){
			this.player2.body.position.x = this.player2_proj.body.position.x;
			this.player2.body.position.y = this.player2_proj.body.position.y;
			this.player2_proj.body.position.x = 3000;
			this.player2_proj.body.position.y = 700;
		}
		
		if(this.player1_proj.body.position.x > 10)
			game.camera.follow(this.player1_proj);
		else
			game.camera.follow(this.player1);
		
		crash.stop();
	},
	/*
	render: function() {

		game.debug.cameraInfo(game.camera, 32, 32);
		game.debug.spriteCoords(player, 32, 500);

	},
	*/
	//Win: function() {
		//game.state.start('win');
	//},
	
	gameOver: function() {
		theme.stop();
		game.state.start('gameOver');
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
		this.player1 = game2.add.sprite(16, 400, 'player1');
		game2.physics.enable(this.player1, Phaser.Physics.ARCADE);
		this.player1.body.gravity.y = 300;
		this.player1.body.maxVelocity.x = 250;
		this.player1.body.collideWorldBounds = true;
		this.player1.scale.setTo(1, -2);
		
		//Player 1's projectile self
		this.player1_proj = game2.add.sprite(0, 700, 'player1_proj');
		game2.physics.enable(this.player1_proj, Phaser.Physics.ARCADE);
		this.player1_proj.enableBody = true;
		this.player1_proj.body.velocity.x = -500;
		this.player1_proj.body.collideWorldBounds = true;
		this.player1_proj.scale.setTo(1, -2);
		
		//Player 2 Variables
		this.player2 = game2.add.sprite(game2.world.width - 32, 400, 'player2');
		game2.physics.enable(this.player2, Phaser.Physics.ARCADE);
		this.player2.body.gravity.y = 300;
		this.player2.body.maxVelocity.x = 250;
		this.player2.body.collideWorldBounds = true;
		this.player2.scale.setTo(1, -2);
		
		//Player 2's projectile self
		this.player2_proj = game2.add.sprite(3000, 700, 'player2_proj');
		game2.physics.enable(this.player2_proj, Phaser.Physics.ARCADE);
		this.player2_proj.enableBody = true;
		this.player2_proj.body.velocity.x = 500;
		this.player2_proj.body.collideWorldBounds = true;
		this.player2_proj.scale.setTo(1, -2);

		//this.win = game2.add.sprite(256, 256, 'win');
		//game2.physics.enable(this.win, Phaser.Physics.ARCADE);
		//game2.physics.arcade.collide(this.player1, floor);
		
		this.enemy = game2.add.group();
		this.enemy.enableBody = true;
		this.enemy.create(200, 400, 'enemy');
		this.enemy.create(400, 370, 'enemy');
		this.enemy.create(600, 400, 'enemy');
		this.enemy.create(800, 400, 'enemy');
		this.enemy.create(1000, 370, 'enemy');
		this.enemy.create(1200, 400, 'enemy');
		this.enemy.create(1400, 370, 'enemy');
		this.enemy.create(1600, 370, 'enemy');
		this.enemy.create(1800, 400, 'enemy');
		this.enemy.create(2000, 370, 'enemy');
		this.enemy.create(2200, 400, 'enemy');
		this.enemy.create(2400, 370, 'enemy');
		this.enemy.create(2600, 400, 'enemy');
		this.enemy.create(2800, 400, 'enemy');
		
		game2.camera.follow(this.player2);
		crash.stop();
		
	},
	
	update: function() {
		crash.play();
		game2.physics.arcade.collide(this.player1, ground);
		//game2.physics.arcade.overlap(this.player1, this.win, this.Win, null, this);
		game2.physics.arcade.collide(this.player2, ground);
		//game2.physics.arcade.overlap(this.player2, this.win, this.Win, null, this);
		var Five = game2.physics.arcade.collide(this.player1, this.player2);
		game2.physics.arcade.overlap(this.player1, this.enemy, this.gameOver, null, this);
		game2.physics.arcade.overlap(this.player2, this.enemy, this.gameOver, null, this);
		
		//if(Five == true){
		//	this.player1.body.velocity.x = -1000;
		//	this.player2.body.velocity.x = 1000;
		//	this.player1.body.velocity.y = -100;
		//	this.player2.body.velocity.y = -100;
		//}
		
		
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
		
				//High Five Movement
		if(this.player1.body.position.x == this.player2.body.position.x-16 && !this.player1.body.touching.down && !this.player2.body.touching.down){
			this.player1_proj.body.position.x = this.player1.body.position.x;
			this.player1_proj.body.position.y = this.player1.body.position.y;
			this.player1.body.position.x = 0;
			this.player1.body.position.y = 600;
			this.player1_proj.body.gravity.y = 0;
			this.player1_proj.body.velocity.x = -500;
			this.player1_proj.body.collideWorldBounds = true;
			this.player1_proj.scale.setTo(1, -2);
			this.player2_proj.body.position.x = this.player2.body.position.x;
			this.player2_proj.body.position.y = this.player2.body.position.y;
			this.player2.body.position.x = 3000;
			this.player2.body.position.y = 3000;
			this.player2_proj.body.gravity.y = 0;
			this.player2_proj.body.velocity.x = 500;
			this.player2_proj.body.collideWorldBounds = true;
			this.player2_proj.scale.setTo(1, -2);
		}
		
		//Moving the players back
		if(this.player1_proj.body.position.x == 0 && this.player1_proj.body.position.y < 400){
			this.player1.body.position.x = this.player1_proj.body.position.x;
			this.player1.body.position.y = this.player1_proj.body.position.y;
			this.player1_proj.body.position.x = 0;
			this.player1_proj.body.position.y = 700;
		}
		
		if(this.player2_proj.body.position.x > 2975 && this.player2_proj.body.position.y < 400){
			this.player2.body.position.x = this.player2_proj.body.position.x;
			this.player2.body.position.y = this.player2_proj.body.position.y;
			this.player2_proj.body.position.x = 3000;
			this.player2_proj.body.position.y = 700;
		}
		
		if(this.player2_proj.body.position.x < 2800)
			game2.camera.follow(this.player2_proj);
		else
			game2.camera.follow(this.player2);
		
		
		crash.stop();
	},
	
	//Win: function() {
		//game2.state.start('win2');
	//},
		
	gameOver: function() {
		game2.state.start('gameOver2');
	}
};