var final = function(game){
	//console.log("%cStarting my awesome game", "color:white; background:red");
};

final.prototype = {
	preload: function(){

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        game.load.image('boton', 'assets/boton_nueva_partida.png', 193, 71);
       
    
    },
  	create: function(){
        
        var titulo = game.add.text(130, 10,'RESULTADOS: ',{font: '25px Arial', fill: '#ffffff'});
        var puntosP = game.add.text(100, 100,'Grupo PACMAN: ' +puntuacion_pacmans,{font: '25px Arial', fill: '#ffffff'});
        var puntosF = game.add.text(100, 130,'Grupo FANTASMA: ' +puntuacion_fantasmas,{font: '25px Arial', fill: '#ffffff'});
        var puntosP1 = game.add.text(100, 160,'PACMAN 1: ' +puntuacion_pacman_uno,{font: '25px Arial', fill: '#ffffff'});
        var puntosP2 = game.add.text(100, 190,'PACMAN 2: ' +puntuacion_pacman_dos,{font: '25px Arial', fill: '#ffffff'});
        var puntosF1 = game.add.text(100, 220,'FANTASMA 1: ' +puntuacion_fantasma_uno,{font: '25px Arial', fill: '#ffffff'});
        var puntosF2 = game.add.text(100, 250,'FANTASMA 2: ' +puntuacion_fantasma_dos,{font: '25px Arial', fill: '#ffffff'});

        //var texto = game.add.text(30, 10,'Pacmans:' + puntuacion_pantalla_final ,{font: '25px Arial', fill: '#ffffff'});
        //this.scoreTextP.text = "Pacman: "+"\n" + this.scoreP;
        //var vkey = game.input.keyboard.addkey(Phaser.Keyboard.V);
        var playButton = this.game.add.button(20,390,"boton",this.playTheGame,this)
        playButton.scale.x = 0.4;
        playButton.scale.y = 0.4;
        var playButton2 = this.game.add.button(230,390,"boton",this.playTheGame2,this)
        playButton2.scale.x = 0.4;
        playButton2.scale.y = 0.4;
        //playButton.anchor.setTo(0.5,0.5);
        
        var obj = null;

       
        

	},
	playTheGame: function(){
		this.game.state.start("menu");
    },
    
    playTheGame2: function(){
		this.game.state.start("pantallaPuntuaciones");
	}
}