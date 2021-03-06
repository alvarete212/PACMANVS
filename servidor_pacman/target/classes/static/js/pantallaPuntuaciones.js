var puntuaciones = function(game){};

puntuaciones.prototype = {
	preload: function(){

        game.load.image('botonFinal', 'assets/boton_volver.png', 100, 71);
    
    },

  	create: function(){
        
    
    
        $.ajax({
            
            method:"GET",
            url: "http://" + window.location.host + "/actualizarPuntuacion",          
            processData: false,
            headers: {

                "Content-type":"application/json"

            }
            }).done(function(data, textStatus, jqXHR){
                
                dato = JSON.parse(data);
                console.log(textStatus+" " + jqXHR.statusCode());
                
                this.prueba = game.add.text(120,50, "PUNTUACIONES ", { fontSize: "24px", fill: "#fff" });
                if(dato.length === 1){
                    
                                    //this.puntuacionUnica = game.add.text(0, 0, "Partida 1" + dato[0].puntuacion_pacmans, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,110, "Partida Actual: PACMANS: " +dato[0].puntuacion_pacmans+ " Fantasmas: "+dato[0].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                }

                if(dato.length === 2){
                                    
                                    //this.puntuacionUnica = game.add.text(0, 0, "Partida 1" + dato[0].puntuacion_pacmans, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,110, "Partida 2: PACMANS: " +dato[1].puntuacion_pacmans+ " Fantasmas: "+dato[1].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,150, "Partida 1: PACMANS: " +dato[0].puntuacion_pacmans+ " Fantasmas: "+dato[0].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                }
                if(dato.length === 3){
                                    
                                    //this.puntuacionUnica = game.add.text(0, 0, "Partida 1" + dato[0].puntuacion_pacmans, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,110, "Partida 3: PACMANS: " +dato[2].puntuacion_pacmans+ " Fantasmas: "+dato[2].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,150, "Partida 2: PACMANS: " +dato[1].puntuacion_pacmans+ " Fantasmas: "+dato[1].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                    this.prueba = game.add.text(70,180, "Partida 1: PACMANS: " +dato[0].puntuacion_pacmans+ " Fantasmas: "+dato[0].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                }

                if(dato.length > 3){
                                    
                                    var altura = 90;
                                    for(var i = dato.length-1; i>dato.length-4; i--){
                                    this.prueba = game.add.text(70,altura, "Partida " +(i+1)+": PACMANS: " +dato[i].puntuacion_pacmans+ " Fantasmas: "+dato[i].puntuacion_fantasmas, { fontSize: "16px", fill: "#fff" });
                                    altura = altura + 30;
                                    }
                                }
                            

                
            }).fail(function(data, textStatus, jqXHR){

                console.log(textStatus + " " + jqXHR.statusCode());

            });



    var playButton3 = this.game.add.button(150,390,"botonFinal",this.goMenu,this)
    playButton3.scale.x = 0.4;
    playButton3.scale.y = 0.4;
    

    },
    

    goMenu: function(){


        var actualizacion = {
            
            nueva_partida: true
            
        }
                
        connection.send(JSON.stringify(actualizacion));
		this.game.state.start("menu");
    },
    
    
    
}