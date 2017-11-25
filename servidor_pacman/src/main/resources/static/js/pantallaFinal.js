var final = function(game){
	//console.log("%cStarting my awesome game", "color:white; background:red");
};
var dato;
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
        var playButton = this.game.add.button(230,390,"boton",this.playTheGame,this)
        playButton.scale.x = 0.7;
        playButton.scale.y = 0.7;
        playButton.anchor.setTo(0.5,0.5);
        
        var obj = null;

       $.ajax({
            
            method:"GET",
            url: "http://localhost:8080/actualizarPuntuacion",          
            processData: false,
            headers: {

                "Content-type":"application/json"

            }
            }).done(function(data, textStatus, jqXHR){
                dato = data;
                dato.array.forEach(function(element) {
                    
                }, this);
                console.log(textStatus+" " + jqXHR.statusCode());
                this.score = game.add.text(1, 255, "PacMan" + dato.puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                this.score.text = "Puntos: "+"\n" + dato.puntuacion_pacmans + dato.puntuacion_fantasmas;
                
            }).fail(function(data, textStatus, jqXHR){

                console.log(textStatus + " " + jqXHR.statusCode());

        });
        

	},
	playTheGame: function(){
		this.game.state.start("pantallaPuntuaciones");
	}
}