

var game = new Phaser.Game(448, 496, Phaser.AUTO, 'game');


var juego = function(game){

    this.map = null;
    this.layer = null;

    this.cereza = null;
    this.fresa = null;
    this.pacman = null;
    this.pacman2 = null;
    this.fantasma1 = null;
    this.fantasma2 = null;

    this.dots = null;
    this.numDots = 0;
    this.totaldots = 0;
    this.pills = null;
    this.numPills = 0;

    //this.time = 30;
    this.safetile = 14;
    this.gridsize = 16;       
    this.threshold = 3;

    this.scoreP = 0;
    this.scoreF = 0;
    this.game = game;

    this.timer = 0;
    this.tiempo = 0;
}

juego.prototype = {

    init: function(){

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

    },

    preload: function(){
        
            this.game.load.image("pill", "assets/pill16.png");
            this.game.load.image("dot","assets/dot.png");
            this.game.load.image('tiles', 'assets/pacman-tiles.png');
            this.game.load.spritesheet('pacman','assets/pacman.png',32,32);
            this.game.load.spritesheet('pacman2','assets/pacman_2.png',32,32);
            this.game.load.spritesheet("ghosts", "assets/ghosts32.png", 32, 32);
            this.game.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);
        
            //Carga de los botones
            //game.load.spritesheet('boton', 'assets/...', 193, 71);
            
        },
        
        
    updateTimer: function(){

        this.tiempo++;

    },

    create: function(){
        

            this.timer = this.game.time.create(false);
            this.map = this.add.tilemap('map');
        
            //botonPulsar = game.add.button(game.world.centerX - 95, 400, '...', accionPulsar, this, 2, 1, 0);
            var that = this;
            this.timer.loop(1000,that.updateTimer,this);
            this.map.addTilesetImage('pacman-tiles', 'tiles');
            this.layer = this.map.createLayer('Pacman');

            this.timer.start();
           //game.add.sprite(0,275,'pacman');
            this.dots = this.add.physicsGroup();//bolitas pequeñas
            //this.dots.enableBody = true;
            this.numDots = this.map.createFromTiles(7, this.safetile, 'dot', this.layer, this.dots);
            this.totaldots = this.numDots;
           
            this.pills = this.add.physicsGroup();//bolitas grandes
            //this.pills.enableBody = true;
            this.numPills = this.map.createFromTiles(40, this.safetile, "pill", this.layer, this.pills);
            //  El primer valor de la funcion createFromTiles corresponde a las posiciones del tilemap que se quieren cambiar por objetos, en este caso, la imagen "pill"
            this.dots.setAll('x', 6, false, false, 1);
            this.dots.setAll('y', 6, false, false, 1);
        
            this.map.setCollisionByExclusion([this.safetile], true, this.layer);
             /* El primer parametro son los ids que no van a tener colision. El true es que lo demas es colisionable y el tercer parametro es
                la capa donde se crea la colision */
        

            this.pos = 1;  
            this.pacman = new PACMAN('pacman',this,{x:(14 * 16 ) + 8,y:(17*16) + 8});
            this.pacman2 = new PACMAN2('pacman2',this,{x:(14 * 16 ) + 8,y:(17*16) + 8});
            this.fantasma1 = new FANTASMA1('ghosts',this,{x:80,y:120});
            this.fantasma2 = new FANTASMA2('ghosts',this, {x: 90,y: 125});
            this.cursors = this.input.keyboard.createCursorKeys();
        
            this.scoreTextP = this.game.add.text(1, 272, "PacMan" + this.scoreP, { fontSize: "16px", fill: "#fff" });
            this.scoreTextF = this.game.add.text(1, 170, "Ghosts" + this.scoreF, { fontSize: "16px", fill: "#fff" });
            //Controles pacman1
            this.cursors["w"] = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.cursors["a"] = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.cursors["s"] = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.cursors["d"] = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

            //Controles Pacman2

            this.cursors["t"] = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
            this.cursors["f"] = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
            this.cursors["g"] = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
            this.cursors["h"] = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
        
        
            //Controles fantasma1
            this.cursors["i"] = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
            this.cursors["j"] = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
            this.cursors["k"] = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
            this.cursors["l"] = this.game.input.keyboard.addKey(Phaser.Keyboard.L);

            //Controles fantasma2 --> flechas de direccion

            
        
    },
        
    checkKeys: function () {
        this.pacman.comprobarTeclas(this.cursors);
        this.fantasma1.comprobarTeclas(this.cursors);
        this.pacman2.comprobarTeclas(this.cursors);
        this.fantasma2.comprobarTeclas(this.cursors);
    },

    update: function(){
        
            this.scoreTextP.text = "Pacman: " + this.scoreP;
            this.scoreTextF.text = "Ghosts: " + this.scoreF;
            this.pacman.update();
            this.fantasma1.update();
            this.pacman2.update();
            this.fantasma2.update();
            this.checkKeys();
            console.log("Tiempo global " + this.tiempo );
            if(this.tiempo === 30)

                this.timer.destroy();
    },
        
    accionPulsar: function(){
            
                //Lo que queremos que haga cuando se pulsa el botón.
            
    },

};
game.state.add('Game', juego, true);

