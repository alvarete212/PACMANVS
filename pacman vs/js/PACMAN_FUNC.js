var PACMAN = function (game, key){

    PACMAN.game = game;
    PACMAN.key = key;

    //Parametros de pacman

    PACMAN.vivo = true;
    PACMAN.velocidad = 300;
    PACMAN.tiempo = 0;

    //Damos los valores a pacman del mismo mundo que del mundo game que pasamos

    PACMAN.gridSize = this.game.gridSize;
    PACMAN.safetile = this.game.safetile;

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

    PACMAN.sprite = game.add.sprite((14 * 16 ) + 8, (17*16) + 8, key, 0);

    //Podemos escalar a pacman, para que se vea más grande

    //PACMAN.sprite.anchor.setTo(0.5);

    ///////ANIMACIONES DE PACMAN////////

    PACMAN.sprite.animation.add('comer', [0, 1, 2, 1], 10, true); //Queremos que se repita en bucle.
    PACMAN.sprite.animation.add('muerte', [3, 4 ,5 ,6, 7, 8, 9, 10, 11, 12, 13], 10, false) //No queremos que se repita en bucle

    //////////////////////////////////

    PACMAN.game.physics.arcade.enable(PACMAN.sprite);
    PACMAN.sprite.play('comer');

    //Llamamos al prototipo de pacman, que tendrá la función de mover.

    PACMAN.mover(Phaser.right);


};

PACMAN.prototype.mover = function(direccion){

    var velocidad = PACMAN.velocidad;

    //Primero comprobamos si no hay direccion alguna

    if(direccion === Phaser.NONE){

        PACMAN.sprite.body.velocity.x = 0;
        PACMAN.sprite.body.velocity.y = 0;
        return;

    }

    //La velocidad debe ir, cuando va a la izquierda como cuando va hacia arriba, en negativo.

    if(direccion === Phaser.LEFT){

        velocidad = -velocidad;

    }

    if(direccion == Phaser.UP){

        velocidad = -velocidad;

    }

    if(direccion === Phaser.RIGHT){

        PACMAN.sprite.body.velocity.x = velocidad;

    }

    if(direccion === Phaser.DOWN){

        PACMAN.sprite.body.velocity.y = velocidad;

    }






}