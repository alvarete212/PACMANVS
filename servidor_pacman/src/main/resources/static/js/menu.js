
var connection;
var personaje;

var menu = function(game){
	//console.log("%cStarting my awesome game", "color:white; background:red");
    var comienzo;
};

  
connection = new WebSocket('ws://'+ window.location.host +'/chat');
connection.onerror = function(e) {
        console.log("WS error: " + e);
}
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

        },
        

	playTheGame: function(){
        
        
        comienzo.play();

        game.state.start("pacman");

		
	}
}