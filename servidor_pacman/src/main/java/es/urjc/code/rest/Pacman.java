package es.urjc.code.rest;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.math.BigDecimal;
import java.util.HashMap;

public class Pacman extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private Map<Integer, Partida> partidas = new HashMap<Integer,Partida>();
        private int numP = 0;
        private int contador = 0;
        private Partida aux;
        public String[] nombre = new String[4];
        
        public void comenzarPartida(WebSocketSession session,int idp) throws IOException{
        
            int contador = 0;
                
                for(Jugador participant : partidas.get(idp).jugadores) {
                
                    if(participant.listo)
                        contador++;
                            
                }  

            
            if(contador == 4){
            
                ObjectNode newNode1 = mapper.createObjectNode();
                newNode1.put("funcion", "playTheGame");

                for(Jugador participant : partidas.get(idp).jugadores) {

                    System.out.println("Nombre: " + participant.name + " id: " + participant.session.getId());
                    System.out.println("Message sent: " + newNode1.toString());
                    participant.session.sendMessage(new TextMessage(newNode1.toString()));

                    }  

            }

        }
        public void Pacman(WebSocketSession session) throws Exception{
        
            nombre[0] = "pacman1";
            nombre[1] = "pacman2";
            nombre[2] = "fantasma1";
            nombre[3] = "fantasma2";
             try{
             
                 if(contador == 0){
            
                     nuevaPartida();
                
                }

                if(contador < 4){

                    Partida actual = partidas.get(numP-1);
                    System.out.println("New user: " + session.getId() + "Partida:" + aux.getId());
                    sessions.put(session.getId(), session);
                    System.out.println("Id partida: " + actual.getId());
                    actual.addJugador(session.getId(), nombre[contador], session);
                    
                    System.out.println("Nuevo jugador");
                    
                    
                    ObjectNode newNode = mapper.createObjectNode();
                    newNode.put("funcion", "setJugador");
                    newNode.put("name", actual.jugadores.get(actual.jugadores.size()-1).name);
                    newNode.put("id", actual.jugadores.get(actual.jugadores.size()-1).id);
                    newNode.put("id_p", actual.getId());
                    actual.jugadores.get(actual.jugadores.size()-1).session.sendMessage(new TextMessage(newNode.toString())); 
                    contador++;
                    if(contador == 4){
                        
                         
                        contador = 0;
                        
                    }

                }
             
             }catch (Exception e){
        
                System.out.println(e);
                
            }
        
        }
        
        public void nuevaPartida(){
        
            aux = new Partida(numP);
            partidas.put(aux.getId(), aux);
            numP++;
            System.out.println("Nueva partida");
        
        }
        
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
            
            Pacman(session);
            
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("Session closed: " + session.getId());
		sessions.remove(session.getId());
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		System.out.println("Message received: " + message.getPayload());
		JsonNode node = mapper.readTree(message.getPayload());

                if(node.get("listo") != null){
                    
                    partidas.get(node.get("idP").asInt()).jugadores.get(node.get("id").asInt()).listo = node.get("listo").asBoolean();
                    comenzarPartida(session,node.get("idP").asInt());
                    
                }else if(node.get("nueva_partida") != null)
                    
                    Pacman(session);
                    
                else if(node.get("destruir").asBoolean() == true){
                
                    partidas.remove(node.get("id_p").asInt());
                    //sessions.remove(node.get("id").asText());
                    System.out.println("Se destruye partida " + node.get("id_p").asInt());
                    //System.out.println("Se destruye jugador " + node.get("id").asText());
                
                }

                else
                    
                    sendOtherParticipants(session, node);
                
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		
		//System.out.println("Entra al metodo");
                int idP = node.get("id_p").asInt();
                String idJ = node.get("id").asText();
                //System.out.println("Guarda las variables");
		ObjectNode newNode = mapper.createObjectNode();
                
                try{
                
                    newNode.put("funcion", "actualizar");
                    newNode.put("name", node.get("name").asText());
                    newNode.put("id", node.get("id").asText());
                    newNode.put("direccion", node.get("direccion").asInt());
                    newNode.put("posX", node.get("posX").asInt());
                    newNode.put("posY", node.get("posY").asInt());
                    newNode.put("ataque", node.get("ataque").asBoolean());

                    System.out.println("Message sent 1: " + newNode.toString());
                    for(Jugador participant : partidas.get(idP).jugadores) {
                        //System.out.println("Entra al bucle");
                            if(!participant.id.equals(idJ)) {
                                    System.out.println("Nombre: " + participant.name + " id: " + participant.session.getId());
                                    System.out.println("Message sent: " + newNode.toString());
                                    participant.session.sendMessage(new TextMessage(newNode.toString()));
                            }
                    }
                
                }catch(Exception e){
                
                    System.out.println(e);
                    
                }
                
	}

}

