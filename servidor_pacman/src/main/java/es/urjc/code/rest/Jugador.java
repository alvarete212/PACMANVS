/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.urjc.code.rest;

import org.springframework.web.socket.WebSocketSession;

public class Jugador{
    
    String name;
    String id;
    int id_partida;
    WebSocketSession session;
    
    public Jugador(String id,String n,int ip, WebSocketSession s){
    
        this.name = n;
        this.id = id;
        this.id_partida = ip;
        this.session = s;
    }
    
}
