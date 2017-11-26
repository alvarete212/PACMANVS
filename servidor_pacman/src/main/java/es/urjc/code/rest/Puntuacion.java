package es.urjc.code.rest;

public class Puntuacion {

    private String puntuacion_pacmans;
    private String puntuacion_fantasmas;
    
    //private List<String> puntos = new ArrayList();
   

    public void setPuntuacion(String[] puntos){
    
        puntuacion_pacmans = puntos[0];
        puntuacion_fantasmas = puntos[1];
        
    }
   
    public String[] getPuntuacion(){ 
    
        String[] puntos = new String[2];
        
        puntos[0] = puntuacion_pacmans;
        puntos[1] = puntuacion_fantasmas;
        
        
        return puntos;
        
    }
    
    public Puntuacion getObjeto(){
    
        return this;  
    
    }
    
    
    /*public void insertar(Puntuacion pts){
    
        List<String> nueva = new ArrayList();
        nueva = this.puntos;
        for(String item: pts.getPuntuaciones()){
    
            nueva.add(item);
        
}
    
        this.puntos = nueva;
        
    }
    
    public void mostrarLista(){
        
        for(String item : puntos){
    
            System.out.print(item);
    
        }
    
        System.out.println();
    }*/
}
