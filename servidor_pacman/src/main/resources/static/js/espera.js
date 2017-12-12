
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
               
        }

}

espera.prototype = {

	preload: function(){
        
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.load.image('logo', 'assets/LOGO.png');
    
    },
        create: function(){
        
        jugar = false;
        var mapa = game.add.sprite(0,0, 'mapa');
        
        mapa.scale.x = 2;
        mapa.scale.y = 2;
        comienzo = game.add.audio('comienzo');
        this.tiempo = this.game.add.text(1, 255, "La partida empieza en: " + (5 - this.contador), { fontSize: "16px", fill: "#fff" });

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

                }
                

        },
        ajugar: function(){

                //if(jugar)
   
                this.contador = 0;
                espera.prototype.timer = game.time.create(false);
                var that = this;
                this.timer.loop(1000,that.updateTimer,this);
                espera.prototype.timer.start();

                        
        }
        

	
}