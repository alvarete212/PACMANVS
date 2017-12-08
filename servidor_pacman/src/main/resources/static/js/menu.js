
var connection;
var personaje;

var menu = function(game){
	//console.log("%cStarting my awesome game", "color:white; background:red");
    var comienzo;
};

menu.prototype = {
	preload: function(){

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.load.image('boton', 'assets/boton_comenzar.png', 193, 71);
        game.load.image('mapa', 'assets/map_inicio.png');
        game.load.audio('comienzo', 'assets/sonidos/pacman_beginning.mp3');
        game.load.image('logo', 'assets/LOGO.png');
    
    },
  	create: function(){
        
        comienzo = game.add.audio('comienzo');
        inicio_p = true;
        //var texto = game.add.text(80, game.world.height-80,'pulsa la tecla v para comenzar',{font: '25px Arial', fill: '#ffffff'});
        //var vkey = game.input.keyboard.addkey(Phaser.Keyboard.V);
        var mapa = game.add.sprite(0,0, 'mapa');
        var logoJuego = game.add.sprite(0, 0, 'logo');
        logoJuego.scale.x = 0.637;
        logoJuego.scale.y = 0.637;
        mapa.scale.x = 2;
        mapa.scale.y = 2;
        var playButton = this.game.add.button(230,320,"boton",this.playTheGame,this)
        playButton.scale.x = 0.7;
        playButton.scale.y = 0.7;
        playButton.anchor.setTo(0.5,0.5);
        //prueba = game.add.text(70,110, "Nuevo jugador: " + getElement, { fontSize: "16px", fill: "#fff" });
        },
        

	playTheGame: function(){
        
        
        comienzo.play();

        game.state.start("pacman");

		
	}
}
  
        connection = new WebSocket('ws://127.0.0.1:8080/chat');
        connection.onerror = function(e) {
                console.log("WS error: " + e);
        }

        /*connection.onmessage = function(msg) {

                console.log("WS message: " + msg.data);
                var message = JSON.parse(msg.data);
                if(message.inicio_p)
                        
                        menu.playTheGame
                                        
                funciones[message.funcion](message);
            
        }**/


        /*$('#send-btn').click(function() {
                var msg = {
                        name : $('#name').val(),
                        message : $('#message').val()
                }
                $('#chat').val($('#chat').val() + "\n" + msg.name + ": " + msg.message);
                connection.send(JSON.stringify(msg));
        });*/
