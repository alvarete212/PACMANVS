var game = new Phaser.Game(448, 496, Phaser.AUTO, 'game');

game.state.add("menu", menu);
game.state.add("pacman", juego);
game.state.add("pantallaFinal", final);

game.state.start("menu");