var playState = { 

	create: function() {
		crash = game.add.audio('crash');
		theme = game.add.audio('Buddy');
		explosion = game.add.audio('Explosion');
		high_five = game.add.audio('High_Five');
		crash.play();
		theme.play();
		game.stage.backgroundColor = "#4488AA";
		game.world.setBounds(0, 0, 10500, 480);
		this.keyboard = game.input.keyboard;
		cursors = game.input.keyboard.createCursorKeys();
		
		ground = game.add.group();
		ground.enableBody = true;
		
		floor = ground.create(0, game.world.height - 64, 'floor');
		//floor.enableBody = true;
		floor.scale.setTo(60, 2);
		floor.body.immovable = true;
		
		
		//create walls
		wall = game.add.group();
		wall.enableBody = true;
		var wall_dist = 0;
		for(var i = 0; i < 10; i++){
			var player1_Wall1 = wall.create(wall_dist, 0, 'floor');
			player1_Wall1.scale.setTo(0.25, 15);
			player1_Wall1.body.immovable = true;
			wall_dist += 500;
		}

		//Player 1 Variables
		this.player1 = game.add.sprite(5000, 400, 'player1');
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
		this.player2 = game.add.sprite(5500, 400, 'player2'); //game.world.width - 32
		game.physics.enable(this.player2, Phaser.Physics.ARCADE);
		this.player2.body.gravity.y = 300;
		this.player2.body.maxVelocity.x = 250;
		this.player2.body.collideWorldBounds = true;
		this.player2.scale.setTo(1, -2);
		
		//Player 2's projectile self
		this.player2_proj = game.add.sprite(10000, 700, 'player2_proj');
		game.physics.enable(this.player2_proj, Phaser.Physics.ARCADE);
		this.player2_proj.enableBody = true;
		this.player2_proj.body.velocity.x = 500;
		this.player2_proj.body.collideWorldBounds = true;
		this.player2_proj.scale.setTo(1, -2);
		
		//Enemy Creation Code
		this.enemy = game.add.group();
		this.enemy.enableBody = true;
		var enemy_pos = 150;
		for (var i = 0; i < 50; i++){
			height_decider = Math.random();
			height_enem = 0;
			if(height_decider > 0.5)
				height_enem = 400;
			else
				height_enem = 370;
			this.obstacle = this.enemy.create(enemy_pos, height_enem, 'enemy');
			enemy_pos += 200;
		}

		game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
		//game.physics.arcade.collide(this.player1, floor);
		
		//game.camera.follow(this.player1);
		game.camera.x = 4600;
		
		//distance vars				
		var dist = 0;
		distText = game.add.text(560, 100, dist, { fontSize: '16px', fill: '#00FF00' });	
		distText.fixedToCamera = true;
		
		//time vars
		this.seconds = 60;
		timer = game.time.create(false);
		timer.loop(1000, this.updateTime, this);
		timer.start();
		
		timeText = game.add.text(300, 0, this.seconds, { fontSize: '32px', fill: '#00FF00' });
		timeText.fixedToCamera = true;
		
		//score vars 
		scoreNum = 0;
		
		//vars for stopping
		this.size_num = 4500;
		this.size_num2 = 6000;
		//subtractText = game.add.text(500, 100, this.player1.body.position.x, { fontSize: '16px', fill: '#00FF00' });	
		//subtractText.fixedToCamera = true;
		
		var cameraStayX = 0;
		
		
		
		crash.stop();
		
	},
	
	update: function() {
		crash.play();
				
		game.physics.arcade.collide(this.player1, ground);
		game.physics.arcade.collide(this.player1, wall);
		game.physics.arcade.collide(this.player1_proj, wall, this.destroyPlayer1_Wall1, null, this);
		//game.physics.arcade.collide(this.player1_proj, this.player_Wall1);
		game.physics.arcade.collide(this.player2, wall);
		game.physics.arcade.collide(this.player2_proj, wall, this.destroyPlayer_2Wall1, null, this);
		//game.physics.arcade.collide(this.player2_proj, wall1, this.destroyWall1, null, this);
		//game.physics.arcade.overlap(this.player1, this.win, this.Win, null, this);
		game.physics.arcade.collide(this.player2, ground);
		//game.physics.arcade.overlap(this.player2, this.win, this.Win, null, this);
		var Five = game.physics.arcade.collide(this.player1, this.player2);
		game.physics.arcade.overlap(this.player1, this.enemy, this.enemyCollision, null, this);
		game.physics.arcade.overlap(this.player2, this.enemy, this.enemyCollision2, null, this);
		
		
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
				if(this.keyboard.isDown(Phaser.Keyboard.D)){
					this.player1.body.acceleration.x = 25;
					this.player1.body.velocity.x = 25;
				}
				else if(this.keyboard.isDown(Phaser.Keyboard.A)){
					this.player1.body.acceleration.x = -25;
					this.player1.body.velocity.x = -25;
				}
				else {
				this.player1.body.acceleration.x = 0;
				this.player1.body.velocity.x = 0;
				}
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
				if(cursors.left.isDown){
					this.player2.body.acceleration.x = -25;
					this.player2.body.velocity.x = -25;
				}
				else if(cursors.right.isDown){
					this.player2.body.acceleration.x = 25;
					this.player2.body.velocity.x = 25;
				}
				else {
				this.player2.body.acceleration.x = 0;
				this.player2.body.velocity.x = 0;
				}
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
			high_five.play();
			explosion.play();
			timer.pause();
			scoreNum = 1;
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
			this.player2.body.position.x = 10000;
			this.player2.body.position.y = 600;
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
			this.player1.body.position.x = this.player1_proj.body.position.x;
			this.player1.body.position.y = this.player1_proj.body.position.y;
			this.player1_proj.body.position.x = 0;
			this.player1_proj.body.position.y = 700;
			this.size_num -= 500;
			this.size_num2 += 500;
			this.player2.body.position.x = this.player2_proj.body.position.x;
			this.player2.body.position.y = this.player2_proj.body.position.y;
			this.player2_proj.body.position.x = 10000;
			this.player2_proj.body.position.y = 700;
			this.seconds = 60;
			
			this.enemy.kill();
			this.enemy = game.add.group();
			this.enemy.enableBody = true;
			var enemy_pos = 150;
			for (var i = 0; i < 50; i++){
			height_decider = Math.random();
			height_enem = 0;
			if(height_decider > 0.5)
				height_enem = 400;
			else
				height_enem = 370;
			this.obstacle = this.enemy.create(enemy_pos, height_enem, 'enemy');
			enemy_pos += 200;
		}
		
			timer.resume();
		}
		
		//Camera Controls
		if((this.player2.body.x - this.player1.body.x) <= 600 + Math.abs(300 - Math.abs(this.player2.body.x - game2.camera.x)))
			game.camera.follow(null);
		else if((this.player2_proj.body.x - this.player1_proj.body.x) <= 600 + Math.abs(300 - Math.abs(this.player2_proj.body.x - game2.camera.x)))
			game.camera.follow(null);
		else if(this.player1_proj.body.position.x > 10)
			game.camera.follow(this.player1_proj);
		else 
			game.camera.follow(this.player1);
		
		//game.camera.follow(this.player1);
		
		//distance text
		dist = Math.round(Math.abs(this.player2.body.position.x - this.player1.body.position.x));
		distText.text = dist;	
		distText.cameraOffset.y = this.player2.body.position.y;
		
		//time text
		timeText.text = this.seconds;
		
		if(this.seconds <= 0){
			theme.stop();
			game.state.start('gameOver');
			game2.state.start('gameOver2');
		}
		
		
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
	
	enemyCollision: function(){
		if(this.player1.inCamera == true){
			theme.stop();
			game.state.start('gameOver');
			game2.state.start('gameOver2');
		}
	},
	
	enemyCollision2: function(){
		if(this.player2.inCamera == true){
			theme.stop();
			game.state.start('gameOver');
			game2.state.start('gameOver2');
		}
	},
	
	
	gameOver: function() {
		theme.stop();
		game.state.start('gameOver');
	}
};

var playState2 = { 

	create: function() {
		crash = game2.add.audio('crash');
		crash.play();
		game2.stage.backgroundColor = "#4488AA";
		game2.world.setBounds(0, 0, 10500, 480);
		this.keyboard = game2.input.keyboard;
		cursors = game2.input.keyboard.createCursorKeys();
		
		ground = game2.add.group();
		ground.enableBody = true;

		floor = ground.create(0, game2.world.height - 64, 'floor');
		//floor.enableBody = true;
		floor.scale.setTo(30, 2);
		floor.body.immovable = true;
		
		//create walls
		wall = game2.add.group();
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
		this.player1 = game2.add.sprite(5000, 400, 'player1');
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
		this.player2 = game2.add.sprite(5500, 400, 'player2');
		game2.physics.enable(this.player2, Phaser.Physics.ARCADE);
		this.player2.body.gravity.y = 300;
		this.player2.body.maxVelocity.x = 250;
		this.player2.body.collideWorldBounds = true;
		this.player2.scale.setTo(1, -2);
		
		//Player 2's projectile self
		this.player2_proj = game2.add.sprite(10000, 700, 'player2_proj');
		game2.physics.enable(this.player2_proj, Phaser.Physics.ARCADE);
		this.player2_proj.enableBody = true;
		this.player2_proj.body.velocity.x = 500;
		this.player2_proj.body.collideWorldBounds = true;
		this.player2_proj.scale.setTo(1, -2);
		
		//Enemy Creation Code
		this.enemy = game2.add.group();
		this.enemy.enableBody = true;	
		var enemy_pos = 150;
		for (var i = 0; i < 50; i++){
			height_decider = Math.random();
			height_enem = 0;
			if(height_decider > 0.5)
				height_enem = 400;
			else
				height_enem = 370;
			var obstacle = this.enemy.create(enemy_pos, height_enem, 'enemy');
			enemy_pos += 200;
		}
		
		
		//dist vars
		var dist = 0;
		distText2 = game2.add.text(0, 100, dist, { fontSize: '16px', fill: '#00FF00' });	
		distText2.fixedToCamera = true;
		
		//time vars
		this.seconds2 = 60;
		timer2 = game2.time.create(false);
		timer2.loop(1000, this.updateTime, this);
		timer2.start();
		
		timeText2 = game2.add.text(300, 0, this.seconds, { fontSize: '32px', fill: '#00FF00' });
		timeText2.fixedToCamera = true;
		
		//vars for stopping
		this.size_num = 4500;
		this.size_num2 = 6000;
		//subtractText = game2.add.text(500, 100, game.global.enemy_loc[1], { fontSize: '16px', fill: '#00FF00' });	
		//subtractText.fixedToCamera = true;
		
		//score vars
		scoreNum2 = 0;
		
		game2.camera.x = 5200;
		
		game2.camera.follow(this.player2);
		crash.stop();
	},
	
	update: function() {
		crash.play();
		game2.physics.arcade.collide(this.player1, ground);
		//game2.physics.arcade.overlap(this.player1, this.win, this.Win, null, this);
		game2.physics.arcade.collide(this.player2, ground);
		game2.physics.arcade.collide(this.player1, wall);
		game2.physics.arcade.collide(this.player1_proj, wall, this.destroyPlayer1_Wall1, null, this);
		game2.physics.arcade.collide(this.player2, wall);
		game2.physics.arcade.collide(this.player2_proj, wall, this.destroyPlayer2_Wall1, null, this);
		//game2.physics.arcade.overlap(this.player2, this.win, this.Win, null, this);
		var Five = game2.physics.arcade.collide(this.player1, this.player2);
		game2.physics.arcade.overlap(this.player1, this.enemy, this.enemyCollision, null, this);
		game2.physics.arcade.overlap(this.player2, this.enemy, this.enemyCollision2, null, this);

		
		this.player1_proj.body.velocity.x = -500;
		this.player2_proj.body.velocity.x = 500;
		
		
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
				if(this.keyboard.isDown(Phaser.Keyboard.D)){
					this.player1.body.acceleration.x = 25;
					this.player1.body.velocity.x = 25;
				}
				else if(this.keyboard.isDown(Phaser.Keyboard.A)){
					this.player1.body.acceleration.x = -25;
					this.player1.body.velocity.x = -25;
				}
				else {
				this.player1.body.acceleration.x = 0;
				this.player1.body.velocity.x = 0;
				}
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
				if(cursors.left.isDown){
					this.player2.body.acceleration.x = -25;
					this.player2.body.velocity.x = -25;
				}
				else if(cursors.right.isDown){
					this.player2.body.acceleration.x = 25;
					this.player2.body.velocity.x = 25;
				}
				else {
					this.player2.body.acceleration.x = 0;
					this.player2.body.velocity.x = 0;
				}
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
			timer2.pause();
			scoreNum2 =1;
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
			this.player2.body.position.x = 10000;
			this.player2.body.position.y = 600;
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
			this.player1.body.position.x = this.player1_proj.body.position.x;
			this.player1.body.position.y = this.player1_proj.body.position.y;
			this.player1_proj.body.position.x = 0;
			this.player1_proj.body.position.y = 700;
			this.size_num -= 500;
			this.size_num2 += 500;
			this.player2.body.position.x = this.player2_proj.body.position.x;
			this.player2.body.position.y = this.player2_proj.body.position.y;
			this.player2_proj.body.position.x = 10000;
			this.player2_proj.body.position.y = 700;
			this.seconds2 = 60;
		
			this.enemy.kill();		
			this.enemy = game2.add.group();
			this.enemy.enableBody = true;	
			var enemy_pos = 150;
			for (var i = 0; i < 50; i++){
				height_decider = Math.random();
				height_enem = 0;
				if(height_decider > 0.5)
					height_enem = 400;
				else
					height_enem = 370;
			var obstacle = this.enemy.create(enemy_pos, height_enem, 'enemy');
			enemy_pos += 200;
			}
			
			timer2.resume();
		}
		
		//for testing horizontal location
		//subtractText.text = this.player2.body.position.x;
		
		//Camera Controls
		if((this.player2.body.x - this.player1.body.x) <= 600 + Math.abs(300 - Math.abs(this.player1.body.x - game.camera.x)))
			game2.camera.follow(null);
		else if((this.player2_proj.body.x - this.player1_proj.body.x) <= 600 + Math.abs(300 - Math.abs(this.player1_proj.body.x - game.camera.x)))
			game2.camera.follow(null);
		else if(this.player2_proj.body.position.x < 10000)
			game2.camera.follow(this.player2_proj);
		else
			game2.camera.follow(this.player2);
		
		//game2.camera.follow(this.player2);
		
		//dist text
		dist = Math.round(Math.abs(this.player2.body.position.x - this.player1.body.position.x));
		distText2.text = dist;	
		distText2.cameraOffset.y = this.player1.body.position.y;
		
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
	
		
	enemyCollision: function(){
		if(this.player1.inCamera == true){
				theme.stop();
			game.state.start('gameOver');
			game2.state.start('gameOver2');
		}
	},
		
	enemyCollision2: function(){
		if(this.player2.inCamera == true){
				theme.stop();
			game.state.start('gameOver');
			game2.state.start('gameOver2');
		}
	},
	
	//Win: function() {
		//game2.state.start('win2');
	//},
		
	gameOver: function() {
		game2.state.start('gameOver2');
	}
};