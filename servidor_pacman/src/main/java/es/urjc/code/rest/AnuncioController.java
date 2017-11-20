package es.urjc.code.rest;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.PrintStream;
import java.io.FileWriter;
import java.io.IOException;
import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnuncioController {
	
    public static void crearFichero(String data) throws FileNotFoundException{
        
        JSONObject obj = new JSONObject();
        obj.put("Puntuaciones", data);

        try{

            File json = new File("prueba.json");

            if(json.exists()){ //el fichero ya estaba creado
            
                FileWriter fstream = new FileWriter("prueba.json", true);
                BufferedWriter out = new BufferedWriter(fstream);
                out.write(obj.toJSONString());
                out.close();
                System.out.println("Escribe al final");
                
            }else{ // creamos un nuevo fichero
            
                PrintStream lectura = new PrintStream(new FileOutputStream("prueba.json"),true);
                lectura.print(obj.toJSONString());
                lectura.close();
                System.out.println("Lo esta creando");
            }
               
        }catch(IOException e){
        
            System.out.println("Otra excepcion");
        
        }
               
    }
    
    @PutMapping("/subirPuntuacion")
    
     public void setp(@RequestBody String data) throws FileNotFoundException{


        System.out.println("data: " + data);
        crearFichero(data);
        puntuacion();

    }


    @GetMapping("/actualizarPuntuacion")

    public String puntuacion(){

        String ptos = null;
        try{

            BufferedReader lectura = new BufferedReader(new FileReader("prueba.json"));
            String linea = lectura.readLine();

            System.out.println(linea);

            lectura.close();
            ptos = linea;

        }catch (FileNotFoundException e){

            System.out.println("Fichero no encontrado");

        }catch(IOException ex){

            System.out.println("Otro tipo de excepcion");

        }

        return ptos;

    }
        

}
