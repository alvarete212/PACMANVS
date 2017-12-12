
var puntuacion_pacmans;
var puntuacion_fantasmas;
var puntuacion_pacman_uno;
var puntuacion_pacman_dos;
var puntuacion_fantasma_uno;
var puntuacion_fantasma_dos;


var juego = function(game){

    this.map = null;
    this.layer = null;

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
    this.comienzo;
    this.scoreP;
    this.scoreF;
    this.game = game;

    this.timer = 0;
    this.tiempo;
    this.final = 120;
    this.contador;
    this.comer;
    
}

var jugadores;
var manejado = {

    id : 0,
    personaje : null,
    id_partida : 0

}


/*connection.onmessage = function(msg) {
    
    console.log("WS message: " + msg.data);
    var message = JSON.parse(msg.data);
  
    funciones[message.funcion](message);

}

connection.onclose = function() {

    console.log("Closing socket");
}*/

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
            
        },
        
        
    updateTimer: function(){

        this.tiempo++;
        this.contador--;

    },

    create: function(){
        

            this.tiempo = 0;
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

            var that = this;
            this.timer.loop(1000,that.updateTimer,this);
            this.map.addTilesetImage('pacman-tiles', 'tiles');
            this.layer = this.map.createLayer('Pacman');

            this.comienzo = true;
            this.timer.start();

            this.dots = this.add.physicsGroup();//bolitas pequeñas
            this.numDots = this.map.createFromTiles(7, this.safetile, 'dot', this.layer, this.dots);
            this.totaldots = this.numDots;
           
            this.pills = this.add.physicsGroup();//bolitas grandes

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
            jugadores = new Array(this.pacman,this.pacman2,this.fantasma1,this.fantasma2);

            this.asignacion();

            console.log("personaje: " + manejado.personaje.nombre);

            this.cursors = this.input.keyboard.createCursorKeys();
            this.comer.loopFull(0.6);
        
            this.scoreTextP = this.game.add.text(1, 255, "PacMan" +this.scoreP, { fontSize: "16px", fill: "#fff" });
            this.scoreTextF = this.game.add.text(1, 160, "Ghosts" + this.scoreF, { fontSize: "16px", fill: "#fff" });
            this.contadorTiempo = this.game.add.text(180, 1, "Contador" + this.contador, {fontSize: "16px", fill: "#fff"});

    },
        
    checkKeys: function () {

        manejado.personaje.comprobarTeclas(this.cursors);

    },

    update: function(){

            this.scoreTextP.text = "Pacman: "+"\n" + this.scoreP;
            this.scoreTextF.text = "Ghosts: "+"\n" + this.scoreF;
            this.contadorTiempo.text = "Tiempo: " + this.contador;
            manejado.personaje.update();
            var actualizacion = {
                
                name : manejado.personaje.nombre,
                id : manejado.id,
                id_p : manejado.id_partida,
                posX : manejado.personaje.sprite.position.x,
                posY : manejado.personaje.sprite.position.y,
                direccion : manejado.personaje.actual,
                ataque : manejado.personaje.ataque,
                destruir : false

            }
            console.log("direccion: " + manejado.personaje.actual);
            try{

                connection.send(JSON.stringify(actualizacion));

            }catch(e){

                console.log(e);

            }
            
            for(var j = 0; j < jugadores.length; j++){

                if(jugadores[j] != manejado.personaje)

                    jugadores[j].update();

            }

            this.checkKeys();
            console.log("Tiempo global " + this.tiempo );


            if(this.tiempo === this.final || this.totaldots === 0){

                var actualizacion = {
                    
                    destruir : true,
                    id : manejado.id,
                    id_p: manejado.id_partida
                   
                }
                connection.send(JSON.stringify(actualizacion));
                    this.timer.destroy();
                    this.comer.stop();
                    puntuacion_pacmans = this.scoreP;
                    puntuacion_fantasmas = this.scoreF;
                    puntuacion_pacman_uno = this.pacman.score;
                    puntuacion_pacman_dos = this.pacman2.score;
                    puntuacion_fantasma_uno = this.fantasma1.score;
                    puntuacion_fantasma_dos = this.fantasma2.score;

                    $.ajax({

                        method:"POST",
                        url: "http://" + window.location.host + "/subirPuntuacion",
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
        
    asignacion: function(){
            
                
            var i = 0;

            while(manejado.personaje != jugadores[i].nombre){

                i++;

            }
            manejado.personaje = jugadores[i];
            console.log("Manejado: " + manejado.personaje.nombre);

    },

};


funciones.prototype = {
    
        /*setJugador : function (message){
    
            manejado.personaje = message.name;
            manejado.id = message.id;
            manejado.id_partida = message.id_p;

        },*/
    
        actualizar : function (message){
    
            console.log("Entra a actualizar");
            var i = 0;
            while(message.name != jugadores[i].nombre){
    
                i++;
    
            }

            jugadores[i].sprite.position.x = message.posX;
            jugadores[i].sprite.position.y = message.posY;
            jugadores[i].ataque = message.ataque;
            console.log("Movido: " + jugadores[i].nombre);
            jugadores[i].mover (message.direccion);

        }
        
    
    };


