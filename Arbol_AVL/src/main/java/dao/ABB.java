package dao;

import dto.Nodo;

public class ABB {
    Nodo raiz;
    
    public ABB(){
        raiz = null;
    }
    
    public Nodo agregar(Nodo ptr, int valor){
        if(ptr == null){
            ptr = new Nodo(valor);
        } else {
            if( valor > ptr.getInferior()){
                
            }
        }
        return null;
    }
}
