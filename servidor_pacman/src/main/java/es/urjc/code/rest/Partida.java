/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;

import java.util.ArrayList;
import java.util.List;
import org.springframework.web.socket.WebSocketSession;

public class Partida {
    
    List<Jugador> jugadores = new ArrayList();
    int id;
    
    public Partida(int id){
    
        this.id = id;
    
    }
    public void addJugador(String id,String n,WebSocketSession s){
    
        this.jugadores.add(new Jugador(id,n,this.id,s));
    
    }
    
    public int getId(){
    
        return this.id;
    
    }
}
