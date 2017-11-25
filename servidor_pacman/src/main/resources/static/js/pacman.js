

//var game = new Phaser.Game(448, 496, Phaser.AUTO, 'game');

var puntuacion_pacmans;
var puntuacion_fantasmas;
var puntuacion_pacman_uno;
var puntuacion_pacman_dos;
var puntuacion_fantasma_uno;
var puntuacion_fantasma_dos;

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

    this.scoreP;
    this.scoreF;
    this.game = game;

    this.timer = 0;
    this.tiempo = 0;
    this.final = 5;
    this.contador;
    this.comer;
    
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
            this.game.load.spritesheet('pacman','assets/pacman asustado.png',32,32);
            this.game.load.spritesheet('pacman2','assets/pacman_2 asustado.png',32,32);
            this.game.load.spritesheet("ghosts", "assets/ghosts32.png", 32, 32);
            this.game.load.tilemap('map', 'assets/pacman-map.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.audio('comiendo', 'assets/sonidos/pacman_chomp.mp3');
            //Carga de los botones
            //game.load.spritesheet('boton', 'assets/...', 193, 71);
            
        },
        
        
    updateTimer: function(){

        this.tiempo++;
        this.contador--;

    },

    create: function(){
        

            this.contador = this.final;
            this.timer = this.game.time.create(false);

            this.scoreP = 0;
            this.scoreF = 0;
            puntuacion_pacmans = 0;
            puntuacion_fantasmas = 0;
            puntuacion_pacman_uno = 0;
            puntuacion_pacman_dos = 0;
            puntuacion_fantasma_uno = 0;
            puntuacion_fantasma_dos = 0;
            this.map = this.add.tilemap('map');
            this.comer = game.add.audio('comiendo');
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
        

              
            this.pacman = new PACMAN('pacman',this,{x:148,y:185});
            this.pacman2 = new PACMAN2('pacman2',this,{x:148,y:280});
            this.fantasma1 = new FANTASMA1('ghosts',this,{x:300,y:185});
            this.fantasma2 = new FANTASMA2('ghosts',this, {x: 300,y: 280});
            this.cursors = this.input.keyboard.createCursorKeys();
            this.comer.loopFull(0.6);
        
            this.scoreTextP = this.game.add.text(1, 255, "PacMan" +this.scoreP, { fontSize: "16px", fill: "#fff" });
            this.scoreTextF = this.game.add.text(1, 160, "Ghosts" + this.scoreF, { fontSize: "16px", fill: "#fff" });
            this.contadorTiempo = this.game.add.text(180, 1, "Contador" + this.contador, {fontSize: "16px", fill: "#fff"});
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
        
            this.scoreTextP.text = "Pacman: "+"\n" + this.scoreP;
            this.scoreTextF.text = "Ghosts: "+"\n" + this.scoreF;
            this.contadorTiempo.text = "Tiempo: " + this.contador;
            this.pacman.update();
            this.fantasma1.update();
            this.pacman2.update();
            this.fantasma2.update();
            this.checkKeys();
            console.log("Tiempo global " + this.tiempo );
            if(this.tiempo === this.final || this.totaldots === 0){

                    this.timer.destroy();
                    this.comer.stop();
                    puntuacion_pacmans = this.scoreP;
                    puntuacion_fantasmas = this.scoreF;
                    puntuacion_pacman_uno = this.pacman.score;
                    puntuacion_pacman_dos = this.pacman2.score;
                    puntuacion_fantasma_uno = this.fantasma1.score;
                    puntuacion_fantasma_dos = this.fantasma2.score;

                    //var puntos = {puntuacion_pacmans,puntuacion_fantasmas};

                    $.ajax({

                        method:"POST",
                        url: "http://localhost:8080/subirPuntuacion",
                        data: JSON.stringify({puntuacion_pacmans,puntuacion_fantasmas}),
                        processData: false,
                        headers: {

                            "Content-type":"application/json"

                        }
                        }).done(function(data, textStatus, jqXHR){

                            console.log(textStatus+" " + jqXHR.statusCode());
                            
                        }).fail(function(data, textStatus, jqXHR){

                            console.log(textStatus + " " + jqXHR.statusCode());

                    });

                    game.state.start("pantallaFinal");
      
            }

               

    },
        
    accionPulsar: function(){
            
                //Lo que queremos que haga cuando se pulsa el botón.
            
    },

};
//game.state.add('Game', juego, true);

