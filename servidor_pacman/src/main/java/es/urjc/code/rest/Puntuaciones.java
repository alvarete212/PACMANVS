package es.urjc.code.rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.PrintStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Puntuaciones {

    @Autowired
    static Puntuacion ptos;
    static Gson gson = new GsonBuilder().setPrettyPrinting().create();;
    static List<Puntuacion> puntos = new ArrayList();
    
    public static void puntuaciones() throws IOException{
    
        String cadena = gson.toJson(puntos);
        añadirFichero(cadena);
      
    }
    
    public static void añadirFichero(String c) throws FileNotFoundException, IOException{
        
        try{

            PrintStream lectura = new PrintStream(new FileOutputStream("prueba.json"),true);
            lectura.print(c);
            lectura.close();

        }catch(FileNotFoundException e){
        
            System.out.println("Fichero no encontrado");
        
        }catch(IOException e){
        
            System.out.println(e);
        
        }
        
    }
    
    public static void gestionDatos(String data) throws FileNotFoundException, IOException{
        
        try{

            File json = new File("prueba.json");  
            ptos = gson.fromJson(data, Puntuacion.class);// data = los datos procedentes de javascript, se guardan en una variable del tipo Puntuacion
             
            if(json.exists()){ //el fichero ya estaba creado

                if(puntos.isEmpty()){ //Si la lista esta vacia, la llenamos con los valores del fichero

                    FileReader archivo = new FileReader("prueba.json");
                    BufferedReader br = new BufferedReader(archivo);
                    java.lang.reflect.Type tipoListaPuntuacion = new TypeToken<List<Puntuacion>>(){}.getType();
                    puntos = gson.fromJson(br, tipoListaPuntuacion);
                    
                }
                
            }
            
            puntos.add(ptos);//añadimos la nueva puntuacion de la partida

            puntuaciones();
                 
               
        }catch(IOException e){
        
            System.out.println("Otra excepcion");
        
        }
               
    }
    
    @PostMapping("/subirPuntuacion")
    
     public void setp(@RequestBody String data) throws FileNotFoundException, IOException{

        gestionDatos(data);

    }

    @GetMapping("/actualizarPuntuacion")

    public String puntuacion() throws ParseException, FileNotFoundException{
        
        String cadena = null;
        
        try{
            
            if(puntos.isEmpty()){ // Si la lista esta vacia, la llenamos con los valores del fichero

                FileReader archivo = new FileReader("prueba.json");
                BufferedReader br = new BufferedReader(archivo);
                java.lang.reflect.Type tipoListaPuntuacion = new TypeToken<List<Puntuacion>>(){}.getType();
                puntos = gson.fromJson(br, tipoListaPuntuacion);
       
            }
            
            cadena = gson.toJson(puntos);
            
        }catch (FileNotFoundException e){

            System.out.println("Fichero no encontrado");

        }

        return cadena;

    }
        

}
