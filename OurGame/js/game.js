//var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'main'/*, {
//	preload: preload, create: create, update: update }*/);

var game = new Phaser.Game(640,480, Phaser.AUTO, 'gameDiv');
game.state.add('boot', bootState);
game.state.add('menu', menuState);
game.state.add('load', loadState);
game.state.add('play', playState);
game.state.add('win', winState);


game.state.start('boot');



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