var FANTASMA1 = function (key,game,startpos){

    this.game = game;
    this.key = key;
    //Parametros de this

    this.velocidad = 60;
    this.estaMuriendo = false;
    this.tiempoAtaque = 0;
    this.startPos = startpos;
    this.nombre = "fantasma1";
    this.timer = 0;
    this.ataque = false;
    this.huir = true;
    //Damos los valores a this del mismo mundo que del mundo game que pasamos

    this.gridsize = game.gridsize;
    this.safetile = game.safetile;

    //Creamos los diferentes puntos de navegacion

    this.marcador = new Phaser.Point(0,0);
    this.curva = new Phaser.Point(0,0);
    this.treshold = 6;

    this.direcciones = [ null, null, null, null, null];
    this.contrarios = [ Phaser.NONE, Phaser.LEFT, Phaser.RIGHT, Phaser.DOWN, Phaser.UP ];

    this.actual = Phaser.NONE;
    this.girando = Phaser.NONE;
    this.quieroIr = Phaser.NONE;
    this.score = 0;
    this.keyPressTimer = 0;
    this.KEY_COOLING_DOWN_TIME = 750;

    //Ahora creamos el sprite this

    this.sprite = this.game.add.sprite(this.startPos.x, this.startPos.y, key, 0);

    //Podemos escalar a this, para que se vea más grande

    this.sprite.anchor.setTo(0.5);

    ///////ANIMACIONES DE this////////

    this.sprite.animations.add('derecha', [11], 10, true); 
    this.sprite.animations.add('arriba', [9], 10, true);
    this.sprite.animations.add('abajo', [10], 10, true);
    this.sprite.animations.add('izquierda', [8], 10, true);//Queremos que se repita en bucle.
    this.sprite.animations.add('huir', [16, 17], 10, true);
    this.sprite.animations.add('morir', [20], 10, true);

    //////////////////////////////////

    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.setSize(16, 16, 0, 0);
    this.sprite.play('derecha');

    //Llamamos al prototipo de this, que tendrá la función de mover.

    this.mover(Phaser.RIGHT);


};
FANTASMA1.prototype.updateCounter = function() {
    
        this.tiempoAtaque++;
    
    }

FANTASMA1.prototype.volver = function(){

    this.game.scoreF -= 50;
    this.score -= 50;
    this.sprite.x = this.startPos.x;
    this.sprite.y = this.startPos.y;
    this.mover(Phaser.RIGHT);

};

FANTASMA1.prototype.mover = function (direccion) {

    var velocidad = this.velocidad;

    if (direccion === Phaser.NONE) {
        this.sprite.body.velocity.x = this.sprite.body.velocity.y = 0;
        return;
    }

    if (direccion === Phaser.LEFT || direccion === Phaser.UP)
    {
        velocidad = -velocidad;
    }
    if (direccion === Phaser.LEFT || direccion === Phaser.RIGHT)
    {
        this.sprite.body.velocity.x = velocidad;
    }
    else
    {
        this.sprite.body.velocity.y = velocidad;
    }
    //  Reset the scale and angle (FANTASMA1 is facing to the right in the sprite sheet)
    if(!this.game.pacman.ataque&& !this.game.pacman2.ataque){

        this.sprite.play('derecha');
        if (direccion === Phaser.LEFT)
        {
            
            this.sprite.play('izquierda');
        }
        else if (direccion === Phaser.UP)
        {
            this.sprite.play('arriba');
        }
        else if (direccion === Phaser.DOWN)
        {
            this.sprite.play('abajo');
        }

    }else{

        this.sprite.play('huir');
    }
    

    this.actual = direccion;

};

FANTASMA1.prototype.atacar = function(){

    console.log("ataque"); 
    this.game.scoreF += 150;
    this.score += 150;


}
FANTASMA1.prototype.update = function() {
    
    
        if(this.game.tiempo < this.game.final && this.game.totaldots > 0){
    
            this.game.physics.arcade.collide(this.sprite, this.game.layer);
            this.game.physics.arcade.overlap(this.sprite, this.game.dots, this.comerDot, null, this);
            this.game.physics.arcade.overlap(this.sprite, this.game.pills, this.comerPill, null, this);
            if(!this.ataque){

                this.game.physics.arcade.overlap(this.sprite,this.game.pacman.sprite, this.volver,null,this);
                this.game.physics.arcade.overlap(this.sprite,this.game.pacman2.sprite, this.volver,null,this);
            }
                
            if(this.ataque){

                if(this.tiempoAtaque < 10000){

                    this.game.physics.arcade.overlap(this.sprite,this.game.pacman.sprite,this.atacar,null,this);
                    this.game.physics.arcade.overlap(this.sprite,this.game.pacman2.sprite,this.atacar,null,this);
                    var that = this;
                    this.timer.loop(1000,that.updateCounter,this);
                    this.timer.start();
                    //console.log("Tiempo" + this.tiempoAtaque);

                }else{
                    
                    this.ataque = false;
                    //this.huir = true;
                    this.timer.destroy();
                    this.tiempoAtaque = 0;
                    //console.log("Modo normal");
                    

                }

            }
            
            //this.game.physics.arcade.overlap(this.sprite,this.game.pacman2.sprite,this.volver,null,this);
            this.marcador.x = this.game.math.snapToFloor(Math.floor(this.sprite.x), this.gridsize) / this.gridsize;
            this.marcador.y = this.game.math.snapToFloor(Math.floor(this.sprite.y), this.gridsize) / this.gridsize;
    
            if(this.marcador.x < 0){//Si llega al borde sin borde, sale por el otro lado
    
                this.sprite.x = this.game.map.widthInPixels - 1;
    
            }
    
            if(this.marcador.x >= this.game.map.width){ 
    
                this.sprite.x = 1;
    
            }
    
            //Ahora nos creamos las direcciones.
    
            this.direcciones[1] = this.game.map.getTileLeft(this.game.layer.index, this.marcador.x, this.marcador.y);
            this.direcciones[2] = this.game.map.getTileRight(this.game.layer.index, this.marcador.x, this.marcador.y);
            this.direcciones[3] = this.game.map.getTileAbove(this.game.layer.index, this.marcador.x, this.marcador.y);
            this.direcciones[4] = this.game.map.getTileBelow(this.game.layer.index, this.marcador.x, this.marcador.y);

            //this.comprobarTeclas();
    
            if(this.girando !== Phaser.NONE){
    
                this.girar();
    
            }
    
        }else{
    
            this.mover(Phaser.NONE);
            if(!this.estaMuriendo){
    
                this.estaMuriendo = true;
                this.sprite.play('morir');
    
            }
    
        }
    
    };
    
FANTASMA1.prototype.comprobarTeclas = function(){

    if (this.game.cursors.left.isDown ||
        this.game.cursors.right.isDown ||
        this.game.cursors.up.isDown ||
        this.game.cursors.down.isDown) {
        this.keyPressTimer = this.game.time.time + this.KEY_COOLING_DOWN_TIME;
    }

    if(this.game.cursors.left.isDown && this.actual !== Phaser.LEFT){

        this.quieroIr = Phaser.LEFT;

    }else if(this.game.cursors.right.isDown && this.actual !== Phaser.RIGHT){

        this.quieroIr = Phaser.RIGHT;

    }

    else if(this.game.cursors.up.isDown && this.actual !== Phaser.UP){

        this.quieroIr = Phaser.UP;

    }

    else if(this.game.cursors.down.isDown && this.actual !== Phaser.DOWN){

        this.quieroIr = Phaser.DOWN;

    } 
    
    if (this.game.time.time > this.keyPressTimer)
    {
        //  This forces them to hold the key down to turn the corner
        this.girando = Phaser.NONE;
        this.quieroIr = Phaser.NONE;
    } else {

        this.comprobarDireccion(this.quieroIr); 
    }

};

FANTASMA1.prototype.comerDot = function(FANTASMA1,dot){

    dot.kill();

    this.game.scoreF += 100;
    this.score += 100;
    this.game.totaldots--; //COMPROBAR SI LAURA LO LLAMA ASÍ EN LA FUNCION GENERAL.

};

FANTASMA1.prototype.comerPill = function(FANTASMA1, pill){

    pill.kill();

    //this.huir = false;
    this.ataque = true;
    this.timer = this.game.time.create(false);
    
    this.game.numPills--;
    


};

//Ahora entramos en la función de giro


FANTASMA1.prototype.girar = function(){

    var sx = Math.floor(this.sprite.x);
    var sy = Math.floor(this.sprite.y);

    //Tenemos que tener en cuenta que, debido al rápido movimiento de FANTASMA1, deberemos tener cuidado, porque muchas veces
    //entre la pulsación y cuando se puede realizar el giro, FANTASMA1 ya puede haber pasado la zona de giro.

    if(!this.game.math.fuzzyEqual(sx, this.curva.x, this.treshold) || !this.game.math.fuzzyEqual(sy, this.curva.y, this.treshold))
    {
        return false;
    }

    //Tenemos que alinear el grid donde nos movemos con las posiciones del sprite de FANTASMA1

    this.sprite.x = this.curva.x;
    this.sprite.y = this.curva.y;

    this.sprite.body.reset(this.curva.x, this.curva.y);
    this.mover(this.girando);
    this.girando = Phaser.NONE;
    return true;

};


//Debemos comprobar si se puede girar en la dirección que se le ha pedido

FANTASMA1.prototype.comprobarDireccion = function(girarA){

    //console.log("Queremos girar a:" + girarA);
    if(this.girando === girarA || this.direcciones[girarA] === null || this.direcciones[girarA].index !== this.safetile){ //Estamos comprobando que no puede girar hacia la direccion que quiere porque ya está en esa direccion, o no puede.

        return;

    }

    if(this.actual === this.contrarios[girarA]){

        this.mover(girarA);
        this.keyPressTimer = this.game.time.time;

    }else{

        
        this.girando = girarA;
        this.curva.x = (this.marcador.x * this.gridsize) + (this.gridsize / 2);
        this.curva.y = (this.marcador.y * this.gridsize) + (this.gridsize / 2);
        this.quieroIr = Phaser.NONE;

    }


};


