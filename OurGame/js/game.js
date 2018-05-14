//var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'main'/*, {
//	preload: preload, create: create, update: update }*/);

var game = new Phaser.Game(600,480, Phaser.AUTO, 'gameDiv');
//game.world.setBounds(0, 0, 3000, 480);
var game2 = new Phaser.Game(600,480, Phaser.AUTO, 'gameDiv');
//game2.world.setBounds(0, 0, 3000, 480);
game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('load', loadState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('gameOver', gameOverState);
game2.state.add('boot2', bootState2);
game2.state.add('menu2', menuState2);
game2.state.add('load2', loadState2);
game2.state.add('play2', playState2);
game2.state.add('win2', winState2);
game2.state.add('gameOver2', gameOverState2);


game.state.start('boot');
game2.state.start('boot2');



/*
function preload() {
	// preload assets
    game.load.spritesheet('dude', 'assets/img/baddie.png', 32, 32);
	game.load.audio('jump', 'assets/audio/Jump.wav'); // sound effect made by me
	game.load.image('block', 'assets/img/block.png');
}

function create() {

}
function update() {
}
*/