var enemy_loc = [];

var playState = { 

	create: function() {
		/*--------------------CRASH SETUP--------------------*/
		crash = this.add.audio('crash');
		crash.play();
		
		/*--------------------AUDIO SETUP--------------------*/
		theme = this.add.audio('Buddy');
		explosion = this.add.audio('High_Five');
		high_five = this.add.audio('High_Five');
		theme.play();
		
		/*--------------------GENERAL SETUP--------------------*/
		this.stage.backgroundColor = "#4A6A87";
		this.world.setBounds(0, 0, 10500, 480);
		this.keyboard = this.input.keyboard;
		cursors = this.input.keyboard.createCursorKeys();
		
		/*--------------------MOVEMENT VARS--------------------*/
		this.facingRight = -30;
		this.facingLeft = 54;
		this.spriteScale = .7;
		this.hitboxWidth = 1.5;
		this.hitboxHeightStand = 7;
		this.hitboxHeightCrouch = 3;
		this.animationSpeed = 18;
		this.startUpSpeed = this.animationSpeed - 5;
		var LeftOrRight1;//true = right; false = left; null = standing still
		var LeftOrRight2;//true = right; false = left; null = standing still
		
		//Create Floor
		ground = this.add.group();
		ground.enableBody = true;
		floor = ground.create(0, this.world.height - 64, 'floor');
		//floor.enableBody = true;
		floor.scale.setTo(60, 2);
		floor.body.immovable = true;
		
		//Create Walls
		wall = this.add.group();
		wall.enableBody = true;
		var wall_dist = 0;
		for(var i = 0; i < 10; i++){
			var player1_Wall1 = wall.create(wall_dist, 0, 'floor');
			player1_Wall1.scale.setTo(0.25, 15);
			player1_Wall1.body.immovable = true;
			wall_dist += 500;
		}
		
		
		//backgrounds = this.add.group();
		//breakRoom = backgrounds.create(5000,10,'lunch');
		this.breakRoom = this.add.tileSprite(0,10, 10000, game.height, 'lunch');
		
		

		//Player 1 Variables
		this.player1_hitbox = this.add.sprite(5000, 400, 'player1');
		this.player1_hitbox.alpha = 0.0;
		this.player1_sprite = this.add.sprite(this.player1_hitbox.x, this.player1_hitbox.y - 110, 'dude');
		this.physics.enable(this.player1_hitbox, Phaser.Physics.ARCADE);
		this.player1_hitbox.body.gravity.y = 300;
		this.player1_hitbox.body.maxVelocity.x = 250;
		this.player1_hitbox.body.collideWorldBounds = true;
		this.player1_sprite.scale.setTo(this.spriteScale,this.spriteScale);
		this.player1_sprite.animations.add('startup', Phaser.Animation.generateFrameNames('run', 0, 4, '', 2), this.startUpSpeed, true);
		this.player1_sprite.animations.add('run', Phaser.Animation.generateFrameNames('run', 5, 15, '', 2), this.animationSpeed, true);
		//this.player1_sprite.animations.add('left', Phaser.Animation.generateFrameNames('left', 2, 8, '', 2), 15, true);
		//this.player1_sprite.animations.play('startup');
		
		//Player 1's projectile self
		this.player1_proj = this.add.sprite(0, 700, 'player1_proj');
		this.physics.enable(this.player1_proj, Phaser.Physics.ARCADE);
		this.player1_proj.enableBody = true;
		this.player1_proj.body.velocity.x = -500;
		this.player1_proj.body.collideWorldBounds = true;
		this.player1_proj.scale.setTo(1, -2);
		
		//Player 2 Variables
		this.player2_hitbox = this.add.sprite(5500, 400, 'player2'); //this.world.width - 32
		this.player2_hitbox.alpha = 0.0;
		this.player2_sprite = this.add.sprite(this.player2_hitbox.x, this.player2_hitbox.y - 10, 'dude');
		this.physics.enable(this.player2_hitbox, Phaser.Physics.ARCADE);
		this.player2_hitbox.body.gravity.y = 300;
		this.player2_hitbox.body.maxVelocity.x = 250;
		this.player2_hitbox.body.collideWorldBounds = true;
		this.player2_sprite.scale.setTo(-this.spriteScale,this.spriteScale);
		this.player2_sprite.animations.add('startup', Phaser.Animation.generateFrameNames('run', 0, 4, '', 2), this.startUpSpeed, true);
		this.player2_sprite.animations.add('run', Phaser.Animation.generateFrameNames('run', 5, 15, '', 2), this.animationSpeed, true);
		
		//Player 2's projectile self
		this.player2_proj = this.add.sprite(10000, 700, 'player2_proj');
		this.physics.enable(this.player2_proj, Phaser.Physics.ARCADE);
		this.player2_proj.enableBody = true;
		this.player2_proj.body.velocity.x = 500;
		this.player2_proj.body.collideWorldBounds = true;
		this.player2_proj.scale.setTo(1, -2);
		
		//Enemy Creation Code
		this.enemy = this.add.group();
		this.enemy.enableBody = true;
		var enemy_pos = 150;
		for (var i = 0; i < 50; i++){
			height_decider = Math.random();
			height_enem = 0;
			if(height_decider > 0.5)
				height_enem = 400;
			else
				height_enem = 340;
			enemy_loc[i] = height_enem;
			var obstacle = this.enemy.create(enemy_pos, enemy_loc[i], 'enemy');
			enemy_pos += 200;
		}

		this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		//this.physics.arcade.collide(this.player1_hitbox, floor);
		
		//this.camera.follow(this.player1_hitbox);
		this.camera.x = 4600;
		
		//distance vars				
		var dist = 0;
		distText = this.add.text(560, 100, dist, { fontSize: '16px', fill: '#00FF00' });	
		distText.fixedToCamera = true;
		
		//time vars
		this.seconds = 1000;
		timer = this.time.create(false);
		timer.loop(1000, this.updateTime, this);
		timer.start();
		
		timeText = this.add.text(300, 0, this.seconds, { fontSize: '32px', fill: '#00FF00' });
		timeText.fixedToCamera = true;
		
		//score vars 
		scoreNum = 0;
		
		//vars for stopping
		this.size_num = 4500;
		this.size_num2 = 6000;
		//subtractText = this.add.text(500, 100, this.player1_hitbox.body.position.x, { fontSize: '16px', fill: '#00FF00' });	
		//subtractText.fixedToCamera = true;
		
		var cameraStayX = 0;
		
		/*------------------------SPLITSCREEN SETUP--------------------*/
		this.screenDivider = this.add.sprite(this.camera.x + this.camera.width -10, 0, 'screenDivider');
		
		crash.stop();
	},
	
	update: function() {
		crash.play();
		//theme.pause();
		
		//move(this.player1_hitbox, this.leftOrRight1, Phaser.Keyboard.W, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D);
		
		//this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
		//this.player2_sprite.y = this.player2_hitbox.y - 110;
				
		this.physics.arcade.collide(this.player1_hitbox, ground);
		this.physics.arcade.collide(this.player1_hitbox, wall);
		this.physics.arcade.collide(this.player1_proj, wall, this.destroyPlayer1_Wall1, null, this);
		//this.physics.arcade.collide(this.player1_proj, this.player_Wall1);
		this.physics.arcade.collide(this.player2_hitbox, wall);
		this.physics.arcade.collide(this.player2_proj, wall, this.destroyPlayer_2Wall1, null, this);
		//this.physics.arcade.collide(this.player2_proj, wall1, this.destroyWall1, null, this);
		//this.physics.arcade.overlap(this.player1_hitbox, this.win, this.Win, null, this);
		this.physics.arcade.collide(this.player2_hitbox, ground);
		//this.physics.arcade.overlap(this.player2_hitbox, this.win, this.Win, null, this);
		var Five = this.physics.arcade.collide(this.player1_hitbox, this.player2_hitbox);
		this.physics.arcade.overlap(this.player1_hitbox, this.enemy, this.enemyCollision, null, this);
		this.physics.arcade.overlap(this.player2_hitbox, this.enemy, this.enemyCollision, null, this);
		
		
		/*--------------------P1 MOVEMENT--------------------*/
		this.player1_sprite.y = this.player1_hitbox.y - 110;
		if(this.LeftOrRight1 == true) 
			this.player1_sprite.x = this.player1_hitbox.x + this.facingRight;
		else if(this.LeftOrRight1 == false)
			this.player1_sprite.x = this.player1_hitbox.x + this.facingLeft;
		else {
			if(this.player1_sprite.scale.x > 0)
				this.player1_sprite.x = this.player1_hitbox.x + this.facingRight;
			else if(this.player1_sprite.scale.x < 0)
				this.player1_sprite.x = this.player1_hitbox.x + this.facingLeft;
		}
		if(this.keyboard.isDown(Phaser.Keyboard.A) && !this.keyboard.isDown(Phaser.Keyboard.S)){
			this.LeftOrRight1 = false;
			this.player1_sprite.scale.setTo(-this.spriteScale,this.spriteScale);
			this.player1_sprite.x = this.player1_hitbox.x + this.facingLeft;
			//this.player1_sprite.y = this.player1_hitbox.y - 110;
			this.player1_hitbox.body.acceleration.x = -300;
			if(this.player1_hitbox.body.velocity.x < 100 && this.player1_hitbox.body.velocity.x > 0)
				this.player1_hitbox.body.velocity.x = 0;
			if(this.player1_sprite.animations.frameName >= 'run04')
				this.player1_sprite.animations.play('run');
			else if(this.player1_sprite.animations.frameName <= 'run03')
				this.player1_sprite.animations.play('startup');
		} else if(this.keyboard.isDown(Phaser.Keyboard.D) && !this.keyboard.isDown(Phaser.Keyboard.S)){
			this.LeftOrRight1 = true;
			this.player1_sprite.scale.setTo(this.spriteScale,this.spriteScale);
			this.player1_sprite.x = this.player1_hitbox.x + this.facingRight;
			//this.player1_sprite.y = this.player1_hitbox.y - 110;
			this.player1_hitbox.body.acceleration.x = 300;
			if(this.player1_hitbox.body.velocity.x < 0 && this.player1_hitbox.body.velocity.x > -100)
				this.player1_hitbox.body.velocity.x = 0;
			if(this.player1_sprite.animations.frameName >= 'run04')
				this.player1_sprite.animations.play('run');
			else if(this.player1_sprite.animations.frameName <= 'run03')
				this.player1_sprite.animations.play('startup');
		} else if(this.keyboard.isDown(Phaser.Keyboard.S)) {
			this.player1_sprite.animations.stop();
			this.player1_sprite.animations.frameName = 'duck';
			if(this.player1_hitbox.body.velocity.x > 0)
				this.player1_hitbox.body.acceleration.x = this.player1_hitbox.body.acceleration.x - 25;
			if(this.player1_hitbox.body.velocity.x < 0)
				this.player1_hitbox.body.acceleration.x = this.player1_hitbox.body.acceleration.x + 25;
			if(this.player1_hitbox.body.velocity.x < 25 && this.player1_hitbox.body.velocity.x > -25){
				if(this.keyboard.isDown(Phaser.Keyboard.D)){
					this.player1_hitbox.body.acceleration.x = 25;
					this.player1_hitbox.body.velocity.x = 25;
				}
				else if(this.keyboard.isDown(Phaser.Keyboard.A)){
					this.player1_hitbox.body.acceleration.x = -25;
					this.player1_hitbox.body.velocity.x = -25;
				}
				else {
					this.player1_hitbox.body.acceleration.x = 0;
					this.player1_hitbox.body.velocity.x = 0;
					//this.player1_sprite.animations.stop();
				}
			}
		} else {
			if(this.player1_hitbox.body.velocity.x > 0)
				this.player1_hitbox.body.acceleration.x = this.player1_hitbox.body.acceleration.x - 35;
			if(this.player1_hitbox.body.velocity.x < 0)
				this.player1_hitbox.body.acceleration.x = this.player1_hitbox.body.acceleration.x + 35;
			if(this.player1_hitbox.body.velocity.x < 50 && this.player1_hitbox.body.velocity.x > -50){
				this.LeftOrRight1 = null;
				if(this.player1_sprite.scale.x > 0)
					this.player1_sprite.x = this.player1_hitbox.x + this.facingRight;
				else if(this.player1_sprite.scale.x < 0)
					this.player1_sprite.x = this.player1_hitbox.x + this.facingLeft;
				if(this.player1_sprite.animations.frameName == 'run06' || this.player1_sprite.animations.frameName == 'run11'|| this.player1_sprite.animations.frameName <= 'run03'){
					this.player1_sprite.animations.stop();
					this.player1_sprite.animations.frameName = 'run00';
				}
				this.player1_hitbox.body.acceleration.x = 0;
				this.player1_hitbox.body.velocity.x = 0;
			}
		}
		//Jump
		if(this.keyboard.isDown(Phaser.Keyboard.W) && this.player1_hitbox.body.touching.down){
			this.player1_hitbox.body.velocity.y = -175;
			jump.play();
		} //Crouch
		else if(this.keyboard.isDown(Phaser.Keyboard.S) && this.player1_hitbox.body.touching.down){
			//this.player1_hitbox.body.velocity.y = 175;
			this.player1_hitbox.scale.setTo(1.5, -this.hitboxHeightCrouch);
		} //Stand
		else {
			this.player1_hitbox.scale.setTo(1.5, -this.hitboxHeightStand);
			//this.player1_hitbox.body.velocity.y = 0;
		}
		
		/*--------------------P2 MOVEMENT--------------------*/
		this.player2_sprite.y = this.player2_hitbox.y - 110;
		if(this.LeftOrRight2 == true) 
			this.player2_sprite.x = this.player2_hitbox.x + this.facingRight;
		else if(this.LeftOrRight2 == false)
			this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
		else {
			if(this.player2_sprite.scale.x > 0)
				this.player2_sprite.x = this.player2_hitbox.x + this.facingRight;
			else if(this.player2_sprite.scale.x < 0)
				this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
		}
		if(cursors.left.isDown && !cursors.down.isDown){
			this.LeftOrRight2 = false;
			this.player2_sprite.scale.setTo(-this.spriteScale,this.spriteScale);
			this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
			//this.player2_sprite.y = this.player2_hitbox.y - 110;
			this.player2_hitbox.body.acceleration.x = -300;
			if(this.player2_hitbox.body.velocity.x < 100 && this.player2_hitbox.body.velocity.x > 0)
				this.player2_hitbox.body.velocity.x = 0;
			if(this.player2_sprite.animations.frameName >= 'run04')
				this.player2_sprite.animations.play('run');
			else if(this.player2_sprite.animations.frameName <= 'run03')
				this.player2_sprite.animations.play('startup');
		} else if(cursors.right.isDown && !cursors.down.isDown){
			this.LeftOrRight2 = true;
			this.player2_sprite.scale.setTo(this.spriteScale,this.spriteScale);
			this.player2_sprite.x = this.player2_hitbox.x + this.facingRight;
			//this.player2_sprite.y = this.player2_hitbox.y - 110;
			this.player2_hitbox.body.acceleration.x = 300;
			if(this.player2_hitbox.body.velocity.x < 0 && this.player2_hitbox.body.velocity.x > -100)
				this.player2_hitbox.body.velocity.x = 0;
			if(this.player2_sprite.animations.frameName >= 'run04')
				this.player2_sprite.animations.play('run');
			else if(this.player2_sprite.animations.frameName <= 'run03')
				this.player2_sprite.animations.play('startup');
		} else if(cursors.down.isDown) {
			this.player2_sprite.animations.stop();
			this.player2_sprite.animations.frameName = 'duck';
			if(this.player2_hitbox.body.velocity.x > 0)
				this.player2_hitbox.body.acceleration.x = this.player2_hitbox.body.acceleration.x - 25;
			if(this.player2_hitbox.body.velocity.x < 0)
				this.player2_hitbox.body.acceleration.x = this.player2_hitbox.body.acceleration.x + 25;
			if(this.player2_hitbox.body.velocity.x < 25 && this.player2_hitbox.body.velocity.x > -25){
				if(cursors.right.isDown){
					this.player2_hitbox.body.acceleration.x = 25;
					this.player2_hitbox.body.velocity.x = 25;
				}
				else if(cursors.left.isDown){
					this.player2_hitbox.body.acceleration.x = -25;
					this.player2_hitbox.body.velocity.x = -25;
				}
				else {
					this.player2_hitbox.body.acceleration.x = 0;
					this.player2_hitbox.body.velocity.x = 0;
					//this.player2_sprite.animations.stop();
				}
			}
		} else {
			if(this.player2_hitbox.body.velocity.x > 0)
				this.player2_hitbox.body.acceleration.x = this.player2_hitbox.body.acceleration.x - 35;
			if(this.player2_hitbox.body.velocity.x < 0)
				this.player2_hitbox.body.acceleration.x = this.player2_hitbox.body.acceleration.x + 35;
			if(this.player2_hitbox.body.velocity.x < 50 && this.player2_hitbox.body.velocity.x > -50){
				this.LeftOrRight2 = null;
				if(this.player2_sprite.scale.x > 0)
					this.player2_sprite.x = this.player2_hitbox.x + this.facingRight;
				else if(this.player2_sprite.scale.x < 0)
					this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
				if(this.player2_sprite.animations.frameName == 'run07' || this.player2_sprite.animations.frameName == 'run12'|| this.player2_sprite.animations.frameName <= 'run03'){
					this.player2_sprite.animations.stop();
					this.player2_sprite.animations.frameName = 'run00';
				}
				this.player2_hitbox.body.acceleration.x = 0;
				this.player2_hitbox.body.velocity.x = 0;
			}
		}
		//Jump
		if(cursors.up.isDown && this.player2_hitbox.body.touching.down){
			this.player2_hitbox.body.velocity.y = -175;
			jump.play();
		} //Crouch
		else if(cursors.down.isDown && this.player2_hitbox.body.touching.down){
			//this.player2_hitbox.body.velocity.y = 175;
			this.player2_hitbox.scale.setTo(1.5, -this.hitboxHeightCrouch);
		} //Stand
		else {
			this.player2_hitbox.scale.setTo(1.5, -this.hitboxHeightStand);
			//this.player2_hitbox.body.velocity.y = 0;
		}
		
		
		//----------------------------------------------------------------------
		
		//High Five Movement
		if(this.player1_hitbox.body.position.x >= this.player2_hitbox.body.position.x-100 && !this.player1_hitbox.body.touching.down && !this.player2_hitbox.body.touching.down){
			high_five.play();
			explosion.play();
			timer.pause();
			scoreNum = 1;
			this.player1_proj.body.position.x = this.player1_hitbox.body.position.x;
			this.player1_proj.body.position.y = this.player1_hitbox.body.position.y;
			this.player1_hitbox.body.position.x = 0;
			this.player1_hitbox.body.position.y = 600;
			this.player1_proj.body.gravity.y = 0;
			this.player1_proj.body.velocity.x = -500;
			this.player1_proj.body.collideWorldBounds = true;
			this.player1_proj.scale.setTo(1, -2);
			this.player2_proj.body.position.x = this.player2_hitbox.body.position.x;
			this.player2_proj.body.position.y = this.player2_hitbox.body.position.y;
			this.player2_hitbox.body.position.x = 10000;
			this.player2_hitbox.body.position.y = 600;
			this.player2_proj.body.gravity.y = 0;
			this.player2_proj.body.velocity.x = 500;
			this.player2_proj.body.collideWorldBounds = true;
			this.player2_proj.scale.setTo(1, -2);
		}
		
		//Stopping the players
		if(this.player1_proj.body.position.x < this.size_num)
			this.player1_proj.body.velocity.x = 0;
			else
				this.player1_proj.body.velocity.x = -500;
		if(this.player2_proj.body.position.x > this.size_num2)
			this.player2_proj.body.velocity.x = 0;
			else
				this.player2_proj.body.velocity.x = 500;
		
		//Moving the players back
		if(this.player1_proj.body.position.x < this.size_num && this.player1_proj.body.position.y < 400 && this.player2_proj.body.position.x > this.size_num2 && this.player2_proj.body.position.y < 400){
			this.player1_hitbox.body.position.x = this.player1_proj.body.position.x;
			this.player1_hitbox.body.position.y = this.player1_proj.body.position.y;
			this.player1_proj.body.position.x = 0;
			this.player1_proj.body.position.y = 700;
			this.size_num -= 500;
			this.size_num2 += 500;
			this.player2_hitbox.body.position.x = this.player2_proj.body.position.x;
			this.player2_hitbox.body.position.y = this.player2_proj.body.position.y;
			this.player2_proj.body.position.x = 10000;
			this.player2_proj.body.position.y = 700;
			this.seconds = 60;
			
			this.enemy.kill();
			this.enemy = this.add.group();
			this.enemy.enableBody = true;
			var enemy_pos = 150;
			for (var i = 0; i < 50; i++){
			height_decider = Math.random();
			height_enem = 0;
			if(height_decider > 0.5)
				height_enem = 400;
			else
				height_enem = 340;
			enemy_loc[i] = height_enem;
			this.obstacle = this.enemy.create(enemy_pos, enemy_loc[i], 'enemy');
			enemy_pos += 200;
		}
		
			timer.resume();
		}
		
		/*-----------------CAMERA CONTROLS------------------*/
		if(this.player1_proj.body.position.x > 10){
			if(this.player1_proj.body.x <= game.camera.x + this.camera.width/2)
				game.camera.follow(this.player1_proj);
			else
				game.camera.follow(null);
		} else if(this.player1_hitbox.body.x > game.camera.x + this.camera.width/2 + 10){
			game.camera.follow(null);
			game.camera.x = game2.camera.x - 600;
		} else if(this.player1_hitbox.body.x < game.camera.x + this.camera.width/2 && game.camera.x <= game2.camera.x - game.camera.width)
			game.camera.follow(this.player1_hitbox);
		else if(game2.camera.x - game.camera.x <= this.camera.width)
			game.camera.follow(null);
		
		if(game2.camera.x - game.camera.x >= this.camera.width + 50)
			this.screenDivider.x = this.camera.x + this.camera.width - 5;
		else if(game2.camera.x - game.camera.x >= this.camera.width + 40)
			this.screenDivider.x = this.camera.x + this.camera.width - 4;
		else if(game2.camera.x - game.camera.x >= this.camera.width + 30)
			this.screenDivider.x = this.camera.x + this.camera.width - 3;
		else if(game2.camera.x - game.camera.x >= this.camera.width + 20)
			this.screenDivider.x = this.camera.x + this.camera.width - 2;
		else if(game2.camera.x - game.camera.x > this.camera.width)
			this.screenDivider.x = this.camera.x + this.camera.width - 1;
		else if(game2.camera.x - game.camera.x <= this.camera.width)
			this.screenDivider.x = this.camera.x + this.camera.width;
//		else
//			game.camera.follow(this.player1_hitbox);
		/*
		else if((Math.round(this.player2_hitbox.body.x,0) - Math.round(this.player1_hitbox.body.x,0)) <= this.camera.width - 4 + Math.abs(300 - Math.abs(Math.round(this.player2_hitbox.body.x,0) - game2.camera.x)))
			game.camera.follow(null);
		else if((this.player2_proj.body.x - this.player1_proj.body.x) <= this.camera.width - 4 + Math.abs(300 - Math.abs(this.player2_proj.body.x - game2.camera.x)))
			game.camera.follow(null);
		else if(this.player1_proj.body.position.x > 10)
			game.camera.follow(this.player1_proj);
		else 
			game.camera.follow(this.player1_hitbox);
		//game.camera.follow(this.player1_hitbox);
		*/
		//distance text
		dist = Math.round(Math.abs(this.player2_hitbox.body.position.x - this.player1_hitbox.body.position.x));
		distText.text = dist;	
		distText.cameraOffset.y = this.player2_hitbox.body.position.y;
		
		//time text
		timeText.text = this.seconds;
		
		if(this.seconds <= 0){
			theme.stop();
			game.state.start('gameOver');
			game2.state.start('gameOver2');
		}
		
		//theme.resume();
		crash.stop();
	},
	
	destroyPlayer1_Wall1: function(player1_proj, player1_Wall1){
				player1_Wall1.kill();
	},
	destroyPlayer2_Wall1: function(player1_proj, player1_Wall1){
				player2_Wall2.kill();
	},
	
	updateTime: function(){
		this.seconds--;
	},
	
	enemyCollision: function(player, obstacle){
		this.seconds = this.seconds - 10;
		obstacle.kill();
	},
	
	gameOver: function() {
		theme.stop();
		game.state.start('gameOver');
	}
	
	//move: function(player, leftOrRight, upButton, leftButton, downButton, rightButton){
	//return;
	//}
};





/*||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||*/





var playState2 = { 

	create: function() {
		/*--------------------CRASH SETUP--------------------*/
		crash = this.add.audio('crash');
		crash.play();
		
		/*--------------------GENERAL SETUP--------------------*/
		this.stage.backgroundColor = "#4A6A87";
		this.world.setBounds(0, 0, 10500, 480);
		this.keyboard = this.input.keyboard;
		cursors = this.input.keyboard.createCursorKeys();
		
		/*--------------------MOVEMENT VARS--------------------*/
		this.facingRight = -30;
		this.facingLeft = 54;
		this.spriteScale = .7;
		this.hitboxWidth = 1.5;
		this.hitboxHeightStand = 7;
		this.hitboxHeightCrouch = 3;
		this.animationSpeed = 18;
		this.startUpSpeed = this.animationSpeed - 5;
		var LeftOrRight1;//true = right; false = left; null = standing still
		var LeftOrRight2;//true = right; false = left; null = standing still
		
		ground = this.add.group();
		ground.enableBody = true;

		floor = ground.create(0, this.world.height - 64, 'floor');
		//floor.enableBody = true;
		floor.scale.setTo(30, 2);
		floor.body.immovable = true;
		
		//backgrounds = this.add.group();
		//breakRoom = backgrounds.create(5000,10,'lunch');
		this.breakRoom = this.add.tileSprite(0,10, 10000, game2.height, 'lunch');
		
		
		//create walls
		wall = this.add.group();
		wall.enableBody = true;
		var wall_dist = 10500;
		for(var i = 0; i < 10; i++){
			var player1_Wall1 = wall.create(wall_dist, 0, 'floor');
			player1_Wall1.scale.setTo(0.25, 15);
			player1_Wall1.body.immovable = true;
			wall_dist -= 500;
		}
		
		player2_Wall1 = wall.create(0, 0, 'floor');
		player2_Wall1.scale.setTo(0.25, 15);
		player2_Wall1.body.immovable = true;

		//Player 1 Variables
		this.player1_hitbox = this.add.sprite(5000, 400, 'player1');
		this.player1_hitbox.alpha = 0.0;
		this.player1_sprite = this.add.sprite(this.player1_hitbox.x, this.player1_hitbox.y - 110, 'dude');
		this.physics.enable(this.player1_hitbox, Phaser.Physics.ARCADE);
		this.player1_hitbox.body.gravity.y = 300;
		this.player1_hitbox.body.maxVelocity.x = 250;
		this.player1_hitbox.body.collideWorldBounds = true;
		this.player1_sprite.scale.setTo(this.spriteScale,this.spriteScale);
		this.player1_sprite.animations.add('startup', Phaser.Animation.generateFrameNames('run', 0, 4, '', 2), this.startUpSpeed, true);
		this.player1_sprite.animations.add('run', Phaser.Animation.generateFrameNames('run', 5, 15, '', 2), this.animationSpeed, true);
		//this.player1_sprite.animations.add('left', Phaser.Animation.generateFrameNames('left', 2, 8, '', 2), 15, true);
		//this.player1_sprite.animations.play('startup');
		
		//Player 1's projectile self
		this.player1_proj = this.add.sprite(0, 700, 'player1_proj');
		this.physics.enable(this.player1_proj, Phaser.Physics.ARCADE);
		this.player1_proj.enableBody = true;
		this.player1_proj.body.velocity.x = -500;
		this.player1_proj.body.collideWorldBounds = true;
		this.player1_proj.scale.setTo(1, -2);
		
		//Player 2 Variables
		this.player2_hitbox = this.add.sprite(5500, 400, 'player2'); //this.world.width - 32
		this.player2_hitbox.alpha = 0.0;
		this.player2_sprite = this.add.sprite(this.player2_hitbox.x, this.player2_hitbox.y - 10, 'dude');
		this.physics.enable(this.player2_hitbox, Phaser.Physics.ARCADE);
		this.player2_hitbox.body.gravity.y = 300;
		this.player2_hitbox.body.maxVelocity.x = 250;
		this.player2_hitbox.body.collideWorldBounds = true;
		this.player2_sprite.scale.setTo(-this.spriteScale,this.spriteScale);
		this.player2_sprite.animations.add('startup', Phaser.Animation.generateFrameNames('run', 0, 4, '', 2), this.startUpSpeed, true);
		this.player2_sprite.animations.add('run', Phaser.Animation.generateFrameNames('run', 5, 15, '', 2), this.animationSpeed, true);
		
		//Player 2's projectile self
		this.player2_proj = this.add.sprite(10000, 700, 'player2_proj');
		this.physics.enable(this.player2_proj, Phaser.Physics.ARCADE);
		this.player2_proj.enableBody = true;
		this.player2_proj.body.velocity.x = 500;
		this.player2_proj.body.collideWorldBounds = true;
		this.player2_proj.scale.setTo(1, -2);
		
		//Enemy Creation Code
		this.enemy = this.add.group();
		this.enemy.enableBody = true;	
		var enemy_pos = 150;
		for (var i = 0; i < 50; i++){
			height_decider = Math.random();
			var obstacle = this.enemy.create(enemy_pos, enemy_loc[i], 'enemy');
			enemy_pos += 200;
		}
		
		
		//dist vars
		var dist = 0;
		distText2 = this.add.text(0, 100, dist, { fontSize: '16px', fill: '#00FF00' });	
		distText2.fixedToCamera = true;
		
		//time vars
		this.seconds2 = 60;
		timer2 = this.time.create(false);
		timer2.loop(1000, this.updateTime, this);
		timer2.start();
		
		timeText2 = this.add.text(300, 0, this.seconds, { fontSize: '32px', fill: '#00FF00' });
		timeText2.fixedToCamera = true;
		
		//vars for stopping
		this.size_num = 4500;
		this.size_num2 = 6000;
		//subtractText = this.add.text(500, 100, game.global.enemy_loc[1], { fontSize: '16px', fill: '#00FF00' });	
		//subtractText.fixedToCamera = true;
		
		//score vars
		scoreNum2 = 0;
		
		this.camera.x = 5200;
		
		this.camera.follow(this.player2_hitbox);
		
		
		/*------------------------SPLITSCREEN SETUP--------------------*/
		this.screenDivider = this.add.sprite(this.camera.x, 0, 'screenDivider');
		
		crash.stop();
	},
	
	update: function() {
		crash.play();
		
		this.physics.arcade.collide(this.player1_hitbox, ground);
		//this.physics.arcade.overlap(this.player1_hitbox, this.win, this.Win, null, this);
		this.physics.arcade.collide(this.player2_hitbox, ground);
		this.physics.arcade.collide(this.player1_hitbox, wall);
		this.physics.arcade.collide(this.player1_proj, wall, this.destroyPlayer1_Wall1, null, this);
		this.physics.arcade.collide(this.player2_hitbox, wall);
		this.physics.arcade.collide(this.player2_proj, wall, this.destroyPlayer2_Wall1, null, this);
		//this.physics.arcade.overlap(this.player2_hitbox, this.win, this.Win, null, this);
		var Five = this.physics.arcade.collide(this.player1_hitbox, this.player2_hitbox);
		this.physics.arcade.overlap(this.player1_hitbox, this.enemy, this.enemyCollision, null, this);
		this.physics.arcade.overlap(this.player2_hitbox, this.enemy, this.enemyCollision, null, this);

		
		this.player1_proj.body.velocity.x = -500;
		this.player2_proj.body.velocity.x = 500;
		
		
		/*--------------------P1 MOVEMENT--------------------*/
		this.player1_sprite.y = this.player1_hitbox.y - 110;
		if(this.LeftOrRight1 == true) 
			this.player1_sprite.x = this.player1_hitbox.x + this.facingRight;
		else if(this.LeftOrRight1 == false)
			this.player1_sprite.x = this.player1_hitbox.x + this.facingLeft;
		else {
			if(this.player1_sprite.scale.x > 0)
				this.player1_sprite.x = this.player1_hitbox.x + this.facingRight;
			else if(this.player1_sprite.scale.x < 0)
				this.player1_sprite.x = this.player1_hitbox.x + this.facingLeft;
		}
		if(this.keyboard.isDown(Phaser.Keyboard.A) && !this.keyboard.isDown(Phaser.Keyboard.S)){
			this.LeftOrRight1 = false;
			this.player1_sprite.scale.setTo(-this.spriteScale,this.spriteScale);
			this.player1_sprite.x = this.player1_hitbox.x + this.facingLeft;
			//this.player1_sprite.y = this.player1_hitbox.y - 110;
			this.player1_hitbox.body.acceleration.x = -300;
			if(this.player1_hitbox.body.velocity.x < 100 && this.player1_hitbox.body.velocity.x > 0)
				this.player1_hitbox.body.velocity.x = 0;
			if(this.player1_sprite.animations.frameName >= 'run04')
				this.player1_sprite.animations.play('run');
			else if(this.player1_sprite.animations.frameName <= 'run03')
				this.player1_sprite.animations.play('startup');
		} else if(this.keyboard.isDown(Phaser.Keyboard.D) && !this.keyboard.isDown(Phaser.Keyboard.S)){
			this.LeftOrRight1 = true;
			this.player1_sprite.scale.setTo(this.spriteScale,this.spriteScale);
			this.player1_sprite.x = this.player1_hitbox.x + this.facingRight;
			//this.player1_sprite.y = this.player1_hitbox.y - 110;
			this.player1_hitbox.body.acceleration.x = 300;
			if(this.player1_hitbox.body.velocity.x < 0 && this.player1_hitbox.body.velocity.x > -100)
				this.player1_hitbox.body.velocity.x = 0;
			if(this.player1_sprite.animations.frameName >= 'run04')
				this.player1_sprite.animations.play('run');
			else if(this.player1_sprite.animations.frameName <= 'run03')
				this.player1_sprite.animations.play('startup');
		} else if(this.keyboard.isDown(Phaser.Keyboard.S)) {
			this.player1_sprite.animations.stop();
			this.player1_sprite.animations.frameName = 'duck';
			if(this.player1_hitbox.body.velocity.x > 0)
				this.player1_hitbox.body.acceleration.x = this.player1_hitbox.body.acceleration.x - 25;
			if(this.player1_hitbox.body.velocity.x < 0)
				this.player1_hitbox.body.acceleration.x = this.player1_hitbox.body.acceleration.x + 25;
			if(this.player1_hitbox.body.velocity.x < 25 && this.player1_hitbox.body.velocity.x > -25){
				if(this.keyboard.isDown(Phaser.Keyboard.D)){
					this.player1_hitbox.body.acceleration.x = 25;
					this.player1_hitbox.body.velocity.x = 25;
				}
				else if(this.keyboard.isDown(Phaser.Keyboard.A)){
					this.player1_hitbox.body.acceleration.x = -25;
					this.player1_hitbox.body.velocity.x = -25;
				}
				else {
					this.player1_hitbox.body.acceleration.x = 0;
					this.player1_hitbox.body.velocity.x = 0;
					//this.player1_sprite.animations.stop();
				}
			}
		} else {
			if(this.player1_hitbox.body.velocity.x > 0)
				this.player1_hitbox.body.acceleration.x = this.player1_hitbox.body.acceleration.x - 35;
			if(this.player1_hitbox.body.velocity.x < 0)
				this.player1_hitbox.body.acceleration.x = this.player1_hitbox.body.acceleration.x + 35;
			if(this.player1_hitbox.body.velocity.x < 50 && this.player1_hitbox.body.velocity.x > -50){
				this.LeftOrRight1 = null;
				if(this.player1_sprite.scale.x > 0)
					this.player1_sprite.x = this.player1_hitbox.x + this.facingRight;
				else if(this.player1_sprite.scale.x < 0)
					this.player1_sprite.x = this.player1_hitbox.x + this.facingLeft;
				if(this.player1_sprite.animations.frameName == 'run06' || this.player1_sprite.animations.frameName == 'run11'|| this.player1_sprite.animations.frameName <= 'run03'){
					this.player1_sprite.animations.stop();
					this.player1_sprite.animations.frameName = 'run00';
				}
				this.player1_hitbox.body.acceleration.x = 0;
				this.player1_hitbox.body.velocity.x = 0;
			}
		}
		//Jump
		if(this.keyboard.isDown(Phaser.Keyboard.W) && this.player1_hitbox.body.touching.down){
			this.player1_hitbox.body.velocity.y = -175;
			jump.play();
		} //Crouch
		else if(this.keyboard.isDown(Phaser.Keyboard.S) && this.player1_hitbox.body.touching.down){
			//this.player1_hitbox.body.velocity.y = 175;
			this.player1_hitbox.scale.setTo(1.5, -this.hitboxHeightCrouch);
		} //Stand
		else {
			this.player1_hitbox.scale.setTo(1.5, -this.hitboxHeightStand);
			//this.player1_hitbox.body.velocity.y = 0;
		}
		
		/*--------------------P2 MOVEMENT--------------------*/
		this.player2_sprite.y = this.player2_hitbox.y - 110;
		if(this.LeftOrRight2 == true) 
			this.player2_sprite.x = this.player2_hitbox.x + this.facingRight;
		else if(this.LeftOrRight2 == false)
			this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
		else {
			if(this.player2_sprite.scale.x > 0)
				this.player2_sprite.x = this.player2_hitbox.x + this.facingRight;
			else if(this.player2_sprite.scale.x < 0)
				this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
		}
		if(cursors.left.isDown && !cursors.down.isDown){
			this.LeftOrRight2 = false;
			this.player2_sprite.scale.setTo(-this.spriteScale,this.spriteScale);
			this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
			//this.player2_sprite.y = this.player2_hitbox.y - 110;
			this.player2_hitbox.body.acceleration.x = -300;
			if(this.player2_hitbox.body.velocity.x < 100 && this.player2_hitbox.body.velocity.x > 0)
				this.player2_hitbox.body.velocity.x = 0;
			if(this.player2_sprite.animations.frameName >= 'run04')
				this.player2_sprite.animations.play('run');
			else if(this.player2_sprite.animations.frameName <= 'run03')
				this.player2_sprite.animations.play('startup');
		} else if(cursors.right.isDown && !cursors.down.isDown){
			this.LeftOrRight2 = true;
			this.player2_sprite.scale.setTo(this.spriteScale,this.spriteScale);
			this.player2_sprite.x = this.player2_hitbox.x + this.facingRight;
			//this.player2_sprite.y = this.player2_hitbox.y - 110;
			this.player2_hitbox.body.acceleration.x = 300;
			if(this.player2_hitbox.body.velocity.x < 0 && this.player2_hitbox.body.velocity.x > -100)
				this.player2_hitbox.body.velocity.x = 0;
			if(this.player2_sprite.animations.frameName >= 'run04')
				this.player2_sprite.animations.play('run');
			else if(this.player2_sprite.animations.frameName <= 'run03')
				this.player2_sprite.animations.play('startup');
		} else if(cursors.down.isDown) {
			this.player2_sprite.animations.stop();
			this.player2_sprite.animations.frameName = 'duck';
			if(this.player2_hitbox.body.velocity.x > 0)
				this.player2_hitbox.body.acceleration.x = this.player2_hitbox.body.acceleration.x - 25;
			if(this.player2_hitbox.body.velocity.x < 0)
				this.player2_hitbox.body.acceleration.x = this.player2_hitbox.body.acceleration.x + 25;
			if(this.player2_hitbox.body.velocity.x < 25 && this.player2_hitbox.body.velocity.x > -25){
				if(cursors.right.isDown){
					this.player2_hitbox.body.acceleration.x = 25;
					this.player2_hitbox.body.velocity.x = 25;
				}
				else if(cursors.left.isDown){
					this.player2_hitbox.body.acceleration.x = -25;
					this.player2_hitbox.body.velocity.x = -25;
				}
				else {
					this.player2_hitbox.body.acceleration.x = 0;
					this.player2_hitbox.body.velocity.x = 0;
					//this.player2_sprite.animations.stop();
				}
			}
		} else {
			if(this.player2_hitbox.body.velocity.x > 0)
				this.player2_hitbox.body.acceleration.x = this.player2_hitbox.body.acceleration.x - 35;
			if(this.player2_hitbox.body.velocity.x < 0)
				this.player2_hitbox.body.acceleration.x = this.player2_hitbox.body.acceleration.x + 35;
			if(this.player2_hitbox.body.velocity.x < 50 && this.player2_hitbox.body.velocity.x > -50){
				this.LeftOrRight2 = null;
				if(this.player2_sprite.scale.x > 0)
					this.player2_sprite.x = this.player2_hitbox.x + this.facingRight;
				else if(this.player2_sprite.scale.x < 0)
					this.player2_sprite.x = this.player2_hitbox.x + this.facingLeft;
				if(this.player2_sprite.animations.frameName == 'run07' || this.player2_sprite.animations.frameName == 'run12'|| this.player2_sprite.animations.frameName <= 'run03'){
					this.player2_sprite.animations.stop();
					this.player2_sprite.animations.frameName = 'run00';
				}
				this.player2_hitbox.body.acceleration.x = 0;
				this.player2_hitbox.body.velocity.x = 0;
			}
		}
		//Jump
		if(cursors.up.isDown && this.player2_hitbox.body.touching.down){
			this.player2_hitbox.body.velocity.y = -175;
			jump.play();
		} //Crouch
		else if(cursors.down.isDown && this.player2_hitbox.body.touching.down){
			//this.player2_hitbox.body.velocity.y = 175;
			this.player2_hitbox.scale.setTo(1.5, -this.hitboxHeightCrouch);
		} //Stand
		else {
			this.player2_hitbox.scale.setTo(1.5, -this.hitboxHeightStand);
			//this.player2_hitbox.body.velocity.y = 0;
		}
		//--------------------------------------------------------------
				//High Five Movement
		if(this.player1_hitbox.body.position.x >= this.player2_hitbox.body.position.x-100 && !this.player1_hitbox.body.touching.down && !this.player2_hitbox.body.touching.down){
			timer2.pause();
			scoreNum2 =1;
			this.player1_proj.body.position.x = this.player1_hitbox.body.position.x;
			this.player1_proj.body.position.y = this.player1_hitbox.body.position.y;
			this.player1_hitbox.body.position.x = 0;
			this.player1_hitbox.body.position.y = 600;
			this.player1_proj.body.gravity.y = 0;
			this.player1_proj.body.velocity.x = -500;
			this.player1_proj.body.collideWorldBounds = true;
			this.player1_proj.scale.setTo(1, -2);
			this.player2_proj.body.position.x = this.player2_hitbox.body.position.x;
			this.player2_proj.body.position.y = this.player2_hitbox.body.position.y;
			this.player2_hitbox.body.position.x = 10000;
			this.player2_hitbox.body.position.y = 600;
			this.player2_proj.body.gravity.y = 0;
			this.player2_proj.body.velocity.x = 500;
			this.player2_proj.body.collideWorldBounds = true;
			this.player2_proj.scale.setTo(1, -2);
		}
		
		//Stopping the players
		if(this.player1_proj.body.position.x < this.size_num)
			this.player1_proj.body.velocity.x = 0;
			else
				this.player1_proj.body.velocity.x = -500;
		if(this.player2_proj.body.position.x > this.size_num2)
			this.player2_proj.body.velocity.x = 0;
			else
				this.player2_proj.body.velocity.x = 500;
		
		//Moving the players back
		if(this.player1_proj.body.position.x < this.size_num && this.player1_proj.body.position.y < 400 && this.player2_proj.body.position.x > this.size_num2 && this.player2_proj.body.position.y < 400){
			this.player1_hitbox.body.position.x = this.player1_proj.body.position.x;
			this.player1_hitbox.body.position.y = this.player1_proj.body.position.y;
			this.player1_proj.body.position.x = 0;
			this.player1_proj.body.position.y = 700;
			this.size_num -= 500;
			this.size_num2 += 500;
			this.player2_hitbox.body.position.x = this.player2_proj.body.position.x;
			this.player2_hitbox.body.position.y = this.player2_proj.body.position.y;
			this.player2_proj.body.position.x = 10000;
			this.player2_proj.body.position.y = 700;
			this.seconds2 = 60;
		
			this.enemy.kill();		
			this.enemy = this.wadd.group();
			this.enemy.enableBody = true;	
			var enemy_pos = 150;
			for (var i = 0; i < 50; i++){
			var obstacle = this.enemy.create(enemy_pos, enemy_loc[i], 'enemy');
			enemy_pos += 200;
			}
			
			timer2.resume();
		}
		
		//for testing horizontal location
		//subtractText.text = this.player2_hitbox.body.position.x;
		
		
		/*-----------------CAMERA CONTROLS------------------*/
		if(this.player2_proj.body.position.x < 10000) {
			if(this.player2_proj.body.x >= game2.camera.x + this.camera.width/2)
				game2.camera.follow(this.player2_proj);
			else
				game2.camera.follow(null);
		} else if(this.player2_hitbox.body.x < game2.camera.x + this.camera.width/2 - 10){
			game2.camera.follow(null);
			game2.camera.x = game.camera.x + 600;
		} else if(this.player2_hitbox.body.x > game2.camera.x + this.camera.width/2 && game2.camera.x >= game.camera.x + game.camera.width)
			game2.camera.follow(this.player2_hitbox);
		else if(game2.camera.x - game.camera.x <= this.camera.width)
			game2.camera.follow(null);
		
		if(game2.camera.x - game.camera.x >= this.camera.width + 50)
			this.screenDivider.x = this.camera.x - 5;
		else if(game2.camera.x - game.camera.x >= this.camera.width + 40)
			this.screenDivider.x = this.camera.x - 6;
		else if(game2.camera.x - game.camera.x >= this.camera.width + 30)
			this.screenDivider.x = this.camera.x - 7;
		else if(game2.camera.x - game.camera.x >= this.camera.width + 20)
			this.screenDivider.x = this.camera.x - 8;
		else if(game2.camera.x - game.camera.x > this.camera.width)
			this.screenDivider.x = this.camera.x - 9;
		else if(game2.camera.x - game.camera.x <= this.camera.width)
			this.screenDivider.x = this.camera.x - 10;
//		else
//			game2.camera.follow(this.player2_hitbox);

		/*
		if((Math.round(this.player2_hitbox.body.x,0) - Math.round(this.player1_hitbox.body.x,0)) <= this.camera.width - 4 + Math.abs(300 - Math.abs(Math.round(this.player1_hitbox.body.x,0) - game.camera.x)))
			game2.camera.follow(null);
		else if((this.player2_proj.body.x - this.player1_proj.body.x) <= this.camera.width - 4 + Math.abs(300 - Math.abs(this.player1_proj.body.x - game.camera.x)))
			game2.camera.follow(null);
		else if(this.player2_proj.body.position.x < 10000)
			game2.camera.follow(this.player2_proj);
		else
			game2.camera.follow(this.player2_hitbox);
		*/
		//game2.camera.follow(this.player2_hitbox);
		
		//dist text
		dist = Math.round(Math.abs(this.player2_hitbox.body.position.x - this.player1_hitbox.body.position.x));
		distText2.text = dist;	
		distText2.cameraOffset.y = this.player1_hitbox.body.position.y;
		
		//time text
		timeText2.text = this.seconds2;
		
		
		crash.stop();
	},
	
	updateTime: function(){
		this.seconds2--;
	},
	
	destroyPlayer1_Wall1: function(player1_proj, player1_Wall1){
				player1_Wall1.kill();
	},
	destroyPlayer2_Wall1: function(player2_proj, player2_Wall1){
				player2_Wall1.kill();
	},
	
	enemyCollision: function(player, obstacle){
		this.seconds2 = this.seconds2 - 10;
		obstacle.kill();
	},
	
	//Win: function() {
		//game2.state.start('win2');
	//},
		
	gameOver: function() {
		game2.state.start('gameOver2');
	}
};