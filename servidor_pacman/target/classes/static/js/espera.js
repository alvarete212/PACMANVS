
var espera = function(game){
        this.contador;
        
};
var connection;
var personaje;

var comienzo;
var jugar;
connection = new WebSocket('ws://'+ window.location.host +'/chat');
connection.onerror = function(e) {
        console.log("WS error: " + e);
}
connection.onmessage = function(msg) {
        
        console.log("WS message: " + msg.data);
        var message = JSON.parse(msg.data);
      
        funciones[message.funcion](message);
    
    }
    
    connection.onclose = function() {
    
        console.log("Closing socket");
}

var funciones = {

        setJugador : function (message){
                
                        manejado.personaje = message.name;
                        manejado.id = message.id;
                        manejado.id_partida = message.id_p;
            
                    },
         playTheGame : function(message){

                //comienzo.play();
                jugar = true;
                espera.prototype.ajugar();
                //game.state.start("pacman");
               
        },

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

}

espera.prototype = {

	preload: function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.load.image('pacman1', 'assets/LOGO.png');
        game.load.image('pacman2', 'assets/boton_comenzar.png', 193, 71);
        game.load.image('fantasma1', 'assets/map_inicio.png');
        game.load.image('fantasma2', 'assets/LOGO.png');

    },
        create: function(){

        //var sprites = [pacman1,pacman2,fantasma1,fantasma2];

        var mapa = game.add.sprite(0,0, 'mapa');
        
        mapa.scale.x = 2;
        mapa.scale.y = 2;
        
        if(manejado.personaje == "pacman1"){

                var pacman1 = game.add.sprite(0,0, 'pacman1'); 
                console.log("Po si que entra");


        }
        
        if(manejado.personaje == "pacman2")
        var pacman2 = game.add.sprite(0,0, 'pacman2');
        if(manejado.personaje == "fantasma1")
        var fantasma1 = game.add.sprite(0,0, 'fantasma1');
        if(manejado.personaje == "fantasma2")
        var fantasma2 = game.add.sprite(0,0, 'fantasma2');  

        jugar = false;
        
        comienzo = game.add.audio('comienzo');
        this.tiempo = this.game.add.text(1, 255, null, { fontSize: "16px", fill: "#fff" });

        var actualizacion = {

                id : manejado.id,
                idP : manejado.id_partida,
                listo : true

        }

        connection.send(JSON.stringify(actualizacion));

        

        },

        updateTimer: function(){

                this.contador++;

        },
        update: function(){

                if(jugar){

                        console.log("Tiempo global " + this.contador );
                        this.tiempo.text = "La partida empieza en: " +  (5 - this.contador);
                        if(this.contador == 5){
        
                                game.state.start("pacman");
        
                        }

                }else{

                        this.tiempo.text = "Esperando jugadores";

                }
                

        },
        ajugar: function(){

                this.contador = 0;
                espera.prototype.timer = game.time.create(false);
                var that = this;
                this.timer.loop(1000,that.updateTimer,this);
                espera.prototype.timer.start();

                        
        }
        

	
}