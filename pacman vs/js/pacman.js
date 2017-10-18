
var game = new Phaser.Game(450, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var PacmanGame = function () {    
    game.map = null;
    game.layer = null;
    
    game.numDots = 0;
    game.TOTAL_DOTS = 0;
    game.score = 0;
    game.scoreText = null;
    
    game.pacman = null; 
    game.clyde = null;
    game.pinky = null;
    game.inky = null;
    game.blinky = null;
    game.isInkyOut = false;
    game.isClydeOut = false;
    game.ghosts = [];

    game.safetile = 14;
    game.gridsize = 16;       
    game.threshold = 3;
    
    game.SPECIAL_TILES = [
        { x: 12, y: 11 },
        { x: 15, y: 11 },
        { x: 12, y: 23 },
        { x: 15, y: 23 }
    ];
    
    game.TIME_MODES = [
        {
            mode: "scatter",
            time: 7000
        },
        {
            mode: "chase",
            time: 20000
        },
        {
            mode: "scatter",
            time: 7000
        },
        {
            mode: "chase",
            time: 20000
        },
        {
            mode: "scatter",
            time: 5000
        },
        {
            mode: "chase",
            time: 20000
        },
        {
            mode: "scatter",
            time: 5000
        },
        {
            mode: "chase",
            time: -1 // -1 = infinite
        }
    ];
    game.changeModeTimer = 0;
    game.remainingTime = 0;
    game.currentMode = 0;
    game.isPaused = false;
    game.FRIGHTENED_MODE_TIME = 7000;
    
    game.ORIGINAL_OVERFLOW_ERROR_ON = true;
    game.DEBUG_ON = true;
    
    game.KEY_COOLING_DOWN_TIME = 250;
    game.lastKeyPressed = 0;
    
    game.game = game;
};
function preload(){

    game.load.image("pill", "assets/pill16.png");
    game.load.image("dot","assets/dot.png");
    game.load.image('tiles', 'assets/pacman-tiles.png');
    game.load.spritesheet('pacman','assets/pacman.png',32,32);
    game.load.spritesheet("ghosts", "assets/ghosts32.png", 32, 32);
    game.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);
    
}

function create(){

    game.map = game.add.tilemap('map');
    game.map.addTilesetImage('pacman-tiles', 'tiles');
    game.add.sprite(0,0,'pacman');
    game.layer = game.map.createLayer('Pacman');

   game.dots = game.add.physicsGroup();
   game.numDots = game.map.createFromTiles(7, game.safetile, 'dot', game.layer, game.dots);
   game.TOTAL_DOTS = game.numDots;
   
   game.pills = game.add.physicsGroup();
   game.numPills = game.map.createFromTiles(40, game.safetile, "pill", game.layer, game.pills);
   //  El primer valor de la funcion createFromTiles corresponde a las posiciones del tilemap que se quieren cambiar por objetos, en este caso, la imagen "pill"
   game.dots.setAll('x', 6, false, false, 1);
   game.dots.setAll('y', 6, false, false, 1);

   game.map.setCollisionByExclusion([game.safetile], true, game.layer);
    /* El primer parametro son los ids que no van a tener colision. El true es que lo demas es colisionable y el tercer parametro es
    la capa donde se crea la colision */

    

}

function update(){}