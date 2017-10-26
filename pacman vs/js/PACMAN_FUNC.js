var PACMAN = function (key){

    this.key = key;

    //Parametros de this

    this.muerto = false;
    this.velocidad = 300;
    this.estaMuriendo = false;
    this.tiempo = 0;

    //Damos los valores a this del mismo mundo que del mundo game que pasamos

    this.gridSize = game.gridSize;
    this.safetile = game.safetile;

    //Creamos los diferentes puntos de navegacion

    this.marcador = new Phaser.Point();
    this.curva = new Phaser.Point();
    this.treshold = 6;

    this.direcciones = [ null, null, null, null, null ];
    this.contrarios = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

    this.actual = Phaser.NONE;
    this.girando = Phaser.NONE;
    this.quieroIr = Phaser.NONE;
    
    this.keyPressTimer = 0;
    this.KEY_COOLING_DOWN_TIME = 750;

    //Ahora creamos el sprite this

    sprite = game.add.sprite((14 * 16 ) + 8, (17*16) + 8, key, 0);

    //Podemos escalar a this, para que se vea más grande

    //this.sprite.anchor.setTo(0.5);

    ///////ANIMACIONES DE this////////

    sprite.animations.add('comer', [0, 1, 2,1], 10, true); //Queremos que se repita en bucle.
    sprite.animations.add('muerte', [3, 4 ,5 ,6, 7, 8, 9, 10, 11, 12, 13], 10, false) //No queremos que se repita en bucle

    //////////////////////////////////

    game.physics.arcade.enable(sprite);
    sprite.play('comer');

    //Llamamos al prototipo de this, que tendrá la función de mover.

    this.mover(Phaser.LEFT);


};

PACMAN.prototype.mover = function(direccion){

    var velocidad = this.velocidad;

    //Primero comprobamos si no hay direccion alguna

    if(direccion === Phaser.NONE){

        sprite.body.velocity.x = 0;
        sprite.body.velocity.y = 0;
        return;

    }

    //La velocidad debe ir, cuando va a la izquierda como cuando va hacia arriba, en negativo.
    if(direccion === Phaser.RIGHT){

        sprite.body.velocity.x = velocidad;
    }

    sprite.scale.x = 1;
    sprite.angle = 0;

    if (direccion === Phaser.LEFT)
    {
        velocidad = -velocidad;
        sprite.body.velocity.x = velocidad;
        sprite.scale.x = -1;
    }
    else if (direccion === Phaser.UP)
    {
        velocidad = -velocidad;
        sprite.body.velocity.y = velocidad;
        sprite.angle = 270;
    }
    else if (direccion === Phaser.DOWN)
    {
        sprite.angle = 90;
        sprite.body.velocity.y = velocidad;
    }

};

PACMAN.prototype.update = function() {
    if(this.muerto != false){

        game.physics.arcade.collide(sprite, game.layer);
        //game.physics.arcade.overlap(sprite, dots, comerDot, null, this);
        //game.physics.arcade.overlap(sprite, pills, comerPill, null, this);

        this.marker.x = game.match.snapToFloor(Math.floor(sprite.x), this.gridsize) / this.gridsize;
        this.marker.y = game.match.snapToFloor(Math.floor(sprite.y), this.gridsize) / this.gridsize;

        if(this.marker.x < 0){

            sprite.x = game.map.widthInPixels - 1;

        }

        if(this.marker.x >= game.map.width){

            sprite.x = 1;

        }

        //Ahora nos creamos las direcciones.

        this.direcciones[1] = game.map.getTileLeft(game.layer.index, marker.x, marker.y);
        this.direcciones[2] = game.map.getTileRight(game.layer.index, marker.x, marker.y);
        this.direcciones[3] = game.map.getTileAbove(game.layer.index, marker.x, marker.y);
        this.direcciones[4] = game.map.getTileBelow(game.layer.index, marker.x, marker.y);
       

        if(this.girando !== Phaser.NONE){

            turn();

        }

    }else{

        this.mover(Phaser.NONE);
        if(!this.estaMuriendo){

            sprite.play("muerte");
            this.estaMuriendo = true;

        }

    }

};

PACMAN.prototype.comprobarTeclas = function(cursors){


    if(cursors.left.isDown && actual !== Phaser.LEFT){

        this.quieroIr = Phaser.LEFT;

    }

    if(cursors.right.isDown && actual !== Phaser.RIGHT){

        this.quieroIr = Phaser.RIGHT;

    }

    if(cursors.up.isDown && actual !== Phaser.UP){

        this.quieroIr = Phaser.UP;

    }

    if(cursors.down.isDown && actual !== Phaser.DOWN){

        this.quieroIr = Phaser.DOWN;

    }

    if (game.tiempo.tiempo > this.keyPressTimer)
    {
       
        this.girando = Phaser.NONE;
        this.quieroIr = Phaser.NONE;

    } else {

        checkDirection(quieroIr);  

    }


};

PACMAN.prototype.comerDot = function(PACMAN, dot){

    dot.kill(); //matamos el dot

    game.score = game.score + 1;
    game.numDots = game.numDots - 1; //COMPROBAR SI LAURA LO LLAMA ASÍ EN LA FUNCION GENERAL.

    if(game.dots.total == 0){

        game.dots.callAll('revive');

    }

};

PACMAN.prototype.comerPill = function(PACMAN, pill){

    pill.kill();

    game.score = game.score + 10; //Comprobar si era 10 lo que subíamos
    game.numPills = game.numPills -1;

    game.entrarPersecucion();

};

//Ahora entramos en la función de giro


PACMAN.prototype.girar = function(){

    var sx = Math.floor(sprite.x);
    var sy = Math.floor(sprite.y);

    //Tenemos que tener en cuenta que, debido al rápido movimiento de PACMAN, deberemos tener cuidado, porque muchas veces
    //entre la pulsación y cuando se puede realizar el giro, PACMAN ya puede haber pasado la zona de giro.

    if(!game.math.fuzzyEqual(sx, curva.x, treshold) || game.math.fuzzyEqual(sy, curva.y, treshold)){
        return false;
    }

    //Tenemos que alinear el grid donde nos movemos con las posiciones del sprite de pacman

    sprite.x = curva.x;
    sprite.y = curva.y;

    sprite.body.reset(curva.x, curva.y);
    mover(girando);
    girando = Phaser.NONE;

    return true;

};

//Debemos comprobar si se puede girar en la dirección que se le ha pedido

PACMAN.prototype.comprobarDireccion = function(girarA){

    if(girando === girarA || direcciones[girarA] === null || direcciones[girarA].index !== safetile){ //Estamos comprobando que no puede girar hacia la direccion que quiere porque ya está en esa direccion, o no puede.

        return;

    }

    if(actual === contrarios[girarA]){

        mover(girarA);
        keyPressTimer = game.time.time;

    }else{

        girando = girarA;
        curva.x = (marker.x * gridsize) + (gridsize / 2);
        curva.y = (marker.y * gridsize) + (gridsize / 2);
        quieroIr = Phaser.NONE;
    }


};

PACMAN.prototype.posicionActual = function(){

    return new Phaser.Point((marker.x * gridsize) + (gridsize / 2), (marker.y * gridsize) + (gridsize / 2));

    //devolvemos la posicion actual de pacman usando PhaserPoint
}

PACMAN.prototype.direccionActual = function(){

    return actual;

}