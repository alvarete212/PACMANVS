package es.urjc.code.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnuncioController {
	
        //@PostMapping("/subirPuntuaciones")
        
        @GetMapping("/actualizarPuntuacion")
        
        public String puntuacion(){
        
            return "furula";
        }
        
	/*@GetMapping("/anuncio")
	public Anuncio anuncios() {
		return new Anuncio("Pepe", "Vendo moto", "Barata");
	}*/

}
