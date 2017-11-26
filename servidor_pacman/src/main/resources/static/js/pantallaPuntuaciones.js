var puntuaciones = function(game){
	//console.log("%cStarting my awesome game", "color:white; background:red");
    //var comienzo;
    var dato;
    
};

puntuaciones.prototype = {
	preload: function(){

       
    
    },

  	create: function(){
        
        //comienzo = game.add.audio('comienzo');
        //var texto = game.add.text(80, game.world.height-80,'pulsa la tecla v para comenzar',{font: '25px Arial', fill: '#ffffff'});
        //var vkey = game.input.keyboard.addkey(Phaser.Keyboard.V);
      
        /*var playButton = this.game.add.button(230,320,"boton",this.playTheGame,this)
        playButton.scale.x = 0.7;
        playButton.scale.y = 0.7;
        playButton.anchor.setTo(0.5,0.5);*/
        

        $.ajax({
            
            method:"GET",
            url: "http://localhost:8080/actualizarPuntuacion",          
            processData: false,
            headers: {

                "Content-type":"application/json"

            }
            }).done(function(data, textStatus, jqXHR){
                
                dato = JSON.parse(data);
                //this.prueba = game.add.text(0,0, "Prueba", { fontSize: "16px", fill: "#fff" });
                //this.score = game.add.text(1, 255, "PacMan" + dato[0].puntuacion_pacmans, { fontSize: "16px", fill: "#fff" });
                //this.score.text = "Puntos: "+"\n" + dato[1].puntuacion_pacmans;
                console.log(textStatus+" " + jqXHR.statusCode());
                
                if(dato.length === 1){
                    
                                    //this.puntuacionUnica = game.add.text(0, 0, "Partida 1" + dato[0].puntuacion_pacmans, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,90, "Partida Actual: PACMANS: " +dato[0].puntuacion_pacmans+ " Fantasmas: "+dato[0].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                }

                if(dato.length === 2){
                                    
                                    //this.puntuacionUnica = game.add.text(0, 0, "Partida 1" + dato[0].puntuacion_pacmans, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,90, "Partida 1: PACMANS: " +dato[0].puntuacion_pacmans+ " Fantasmas: "+dato[0].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,120, "Partida 2: PACMANS: " +dato[1].puntuacion_pacmans+ " Fantasmas: "+dato[1].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                }
                if(dato.length === 3){
                                    
                                    //this.puntuacionUnica = game.add.text(0, 0, "Partida 1" + dato[0].puntuacion_pacmans, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,90, "Partida 1: PACMANS: " +dato[0].puntuacion_pacmans+ " Fantasmas: "+dato[0].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,120, "Partida 2: PACMANS: " +dato[1].puntuacion_pacmans+ " Fantasmas: "+dato[1].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,150, "Partida 3: PACMANS: " +dato[2].puntuacion_pacmans+ " Fantasmas: "+dato[2].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                }

                if(dato.length > 3){
                                    
                                    var altura = 90;
                                    for(var i = dato.length-1; i>dato.length-4; i--){
                                    this.prueba = game.add.text(70,altura, "Partida " +i+": PACMANS: " +dato[i].puntuacion_pacmans+ " Fantasmas: "+dato[i].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                    altura = altura + 30;
                                    }
                                }
                            

                
            }).fail(function(data, textStatus, jqXHR){

                console.log(textStatus + " " + jqXHR.statusCode());

            });



            

	},
    
    
    
}