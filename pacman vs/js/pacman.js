
var game = new Phaser.Game(450, 500, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){

    game.load.image("pill", "assets/pill16.png");
    game.load.image("dot","assets/dot.png");
    game.load.image('tiles', 'assets/pacman-tiles.png');
    game.load.spritesheet('pacman','assets/pacman.png',32,32);
    game.load.spritesheet('pacman2','assets/pacman_2.png',32,32);
    game.load.spritesheet("ghosts", "assets/ghosts32.png", 32, 32);
    game.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);
    
}

function create(){

    game.map = game.add.tilemap('map');
    game.map.addTilesetImage('pacman-tiles', 'tiles');
    game.layer = game.map.createLayer('Pacman');

   //game.add.sprite(0,275,'pacman');
    dots = game.add.physicsGroup();//bolitas pequeñas
    numDots = game.map.createFromTiles(7, game.safetile, 'dot', game.layer, dots);
    totaldots = numDots;
   
    pills = game.add.physicsGroup();//bolitas grandes
    numPills = game.map.createFromTiles(40, game.safetile, "pill", game.layer, pills);
    //  El primer valor de la funcion createFromTiles corresponde a las posiciones del tilemap que se quieren cambiar por objetos, en este caso, la imagen "pill"
    dots.setAll('x', 6, false, false, 1);
    dots.setAll('y', 6, false, false, 1);

    game.map.setCollisionByExclusion([game.safetile], true, game.layer);
     /* El primer parametro son los ids que no van a tener colision. El true es que lo demas es colisionable y el tercer parametro es
        la capa donde se crea la colision */

    var pacman = new PACMAN(game,'pacman');
    var pacman2 = new PACMAN(game,'pacman2');
    /*var fantasma1 = new fantasma1('ghosts');
        fantasma1.animations.add('derecha',[3],10,true);
        fantasma1.animations.add('izquierda',[0],10,true);
        fantasma1.animations.add('arriba',[1],10,true);
        fantasma1.animations.add('abajo',[2],10,true);
    
    var fantasma2 = new fantasma1('ghosts');
        fantasma2.animations.add('derecha',[7],10,true);
        fantasma2.animations.add('izquierda',[4],10,true);
        fantasma2.animations.add('arriba',[5],10,true);
        fantasma2.animations.add('abajo',[6],10,true);*/

    var score = 0;
    var time = 30;
    scoreText = game.add.text(8,272,"Score: " + score,{fontsize: "16",fill:"red"});
    timeText = game.add.text(400,400,"Time: " + time,{fontsize:"18",fill:"purple"});
    cursors = game.input.keyboard.createCursorKeys();

    //Controles pacman1
    cursors["w"] = input.keyboard.addKey(Phaser.Keyboard.W);
    cursors["a"] = input.keyboard.addKey(Phaser.Keyboard.A);
    cursors["s"] = input.keyboard.addKey(Phaser.Keyboard.S);
    cursors["d"] = input.keyboard.addKey(Phaser.Keyboard.D);

    //Controles pacman2
    cursors["i"] = input.keyboard.addKey(Phaser.Keyboard.I);
    cursors["j"] = input.keyboard.addKey(Phaser.Keyboard.J);
    cursors["k"] = input.keyboard.addKey(Phaser.Keyboard.K);
    cursors["l"] = input.keyboard.addKey(Phaser.Keyboard.L);
    //Controles fantasma1

    //Controles fantasma2
    

}

function update(){

}