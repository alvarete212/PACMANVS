
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){

    game.load.image('map','assets/map.png');

}

function create(){

    game.add.sprite(0, 0, 'map');

}

function update(){}