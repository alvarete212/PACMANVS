
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){

    game.load.image('map','assets/map.png');
    game.load.image("pill", "assets/pill16.png");
    game.load.image('tiles', 'assets/pacman-tiles.png');
    game.load.spritesheet('pacman','assets/pacman.png',32,32);
    game.load.spritesheet("ghosts", "assets/ghosts32.png", 32, 32);
    game.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);
    
}

function create(){

    game.add.sprite(0, 0, 'map');

}

function update(){}