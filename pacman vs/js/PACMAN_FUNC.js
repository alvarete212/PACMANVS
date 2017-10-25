var PACMAN = function (game, key){

    PACMAN.key = key;

    //Parametros de pacman

    PACMAN.vivo = true;
    PACMAN.velocidad = 300;
    PACMAN.tiempo = 0;

    //Damos los valores a pacman del mismo mundo que del mundo game que pasamos

    PACMAN.gridSize = game.gridSize;
    PACMAN.safetile = game.safetile;

    //Creamos los diferentes puntos de navegacion

    PACMAN.marcador = new Phaser.Point();
    PACMAN.curva = new Phaser.Point();
    PACMAN.treshold = 6;

    PACMAN.direcciones = [ null, null, null, null, null ];
    PACMAN.contrarios = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];

    PACMAN.actual = Phaser.NONE;
    PACMAN.girando = Phaser.NONE;
    PACMAN.quieroIr = Phaser.NONE;
    
    PACMAN.keyPressTimer = 0;
    PACMAN.KEY_COOLING_DOWN_TIME = 750;

    //Ahora creamos el sprite PACMAN

    sprite = game.add.sprite((14 * 16 ) + 8, (17*16) + 8, key, 0);

    //Podemos escalar a pacman, para que se vea más grande

    //PACMAN.sprite.anchor.setTo(0.5);

    ///////ANIMACIONES DE PACMAN////////

    sprite.animations.add('comer', [0, 1, 2,1], 10, true); //Queremos que se repita en bucle.
    sprite.animations.add('muerte', [3, 4 ,5 ,6, 7, 8, 9, 10, 11, 12, 13], 10, false) //No queremos que se repita en bucle

    //////////////////////////////////

    game.physics.arcade.enable(sprite);
    sprite.play('comer');

    //Llamamos al prototipo de pacman, que tendrá la función de mover.

    this.mover(Phaser.LEFT);


};

PACMAN.prototype.mover = function(direccion){

    var velocidad = PACMAN.velocidad;

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
        sprite.angle = 270;
    }
    else if (direccion === Phaser.DOWN)
    {
        sprite.angle = 90;
        sprite.body.velocity.y = velocidad;
    }






}