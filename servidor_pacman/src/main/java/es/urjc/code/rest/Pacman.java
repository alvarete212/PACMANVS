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
import java.util.HashMap;

public class Pacman extends TextWebSocketHandler {

	private Map<String, WebSocketSession> sessions = new ConcurrentHashMap<>();
	private ObjectMapper mapper = new ObjectMapper();
	private Map<Integer, Partida> partidas = new HashMap<Integer,Partida>();
        private int numP = 0;
        private int contador = 0;
        private Partida aux;
        public String[] nombre = new String[4];
        
        
        public void nuevaPartida(){
        
            aux = new Partida(numP);
            partidas.put(aux.getId(), aux);
            numP++;
            System.out.println("Nueva partida");
        
        }
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
            
            nombre[0] = "pacman1";
            nombre[1] = "pacman2";
            nombre[2] = "fantasma1";
            nombre[3] = "fantasma2";
             try{
             
                 if(contador == 0){
            
                     nuevaPartida();
                
                }

                if(contador < 4){

                    System.out.println("New user: " + session.getId() + "Partida:" + aux.getId());
                    sessions.put(session.getId(), session);
                    System.out.println("Id partida: " + partidas.get(numP-1).getId());
                    partidas.get(numP-1).addJugador(session.getId(), nombre[contador], session);
                    contador++;
                    System.out.println("Nuevo jugador");

                    if(contador == 4){
                    
                        for(Jugador participant : partidas.get(numP-1).jugadores) {
                            
                            ObjectNode newNode = mapper.createObjectNode();
                            newNode.put("name", participant.name);
                            participant.session.sendMessage(new TextMessage(newNode.toString())); 
                            
                            System.out.println("Jugador " + participant.id + " Nombre: " + newNode.toString());
                            
                        }
                    
                        contador = 0;
                        
                    }
                        
                        
                    
                }
             
             }catch (Exception e){
        
                System.out.println(e);
                
            }
            
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
		
		sendOtherParticipants(session, node);
	}

	private void sendOtherParticipants(WebSocketSession session, JsonNode node) throws IOException {

		System.out.println("Message sent: " + node.toString());
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode.put("name", node.get("name").asText());
		newNode.put("posX", node.get("posX").asText());
                newNode.put("posY", node.get("posY").asText());
		
		
		for(WebSocketSession participant : sessions.values()) {
			if(!participant.getId().equals(session.getId())) {
				participant.sendMessage(new TextMessage(newNode.toString()));
			}
		}
	}

}

