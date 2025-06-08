package dao;

import dto.Nodo;

public class ABB {
    //Es publico porque en la vista accedo directamente a mi variable raiz
    public Nodo raiz;
    
    public ABB(){
        //Lo inicializo
        raiz = null;
    }
    
    //Solo es para calcular la altura del nodo especifico
    public int altura(Nodo ptr){
        if(ptr == null){
            return 0;
        } else {
            return ptr.getAltura();
        }
    }
    /*
    Esto es el agregar de un arbol se empieza con una cabeza y el resto si es 
    menor a la cabeza va a la izquierda y si es mayor a la derecha y asi se va construyendo
    */
    public Nodo agregar(Nodo ptr, int valor) {
        if (ptr == null) {
            return new Nodo(valor);
        } else {
            if (valor < ptr.getValor()) {
                ptr.setIzquierda(agregar(ptr.getIzquierda(), valor));  // Insertar a la izquierda
            } else if (valor > ptr.getValor()) {
                ptr.setDerecha(agregar(ptr.getDerecha(), valor)); // Insertar a la derecha
            } else {
                // Si es igual, incrementar el contador (valor repetido)
                ptr.incrementarContador();
            }
        }
        //Formula del arbol AVL es FE factor de equilibrio hoja derecha menos hoja izquierda    
        ptr.setAltura(Math.max(altura(ptr.getIzquierda()),altura(ptr.getDerecha())) + 1);
        return equilibrar(ptr);
    }
    
    //funcion para REESCRIBIR EL ARBOL aqui lo equilibro y lo reescribo para que el arbol este equilibrado a la derecha
    public Nodo rDer(Nodo ptr){
        Nodo aux = ptr.getIzquierda();
        ptr.setIzquierda(aux.getDerecha());
        aux.setDerecha(ptr);
        
        ptr.setAltura(Math.max(altura(ptr.getIzquierda()),altura(ptr.getDerecha())) + 1);
        aux.setAltura(Math.max(altura(aux.getIzquierda()),altura(aux.getDerecha())) + 1);
        return aux;
    }
    
    //lo mismo pero para la izquierda es decir que en ambos casos va a rotar o cambiar el arbol para estar equilibrado
    public Nodo rIzq(Nodo ptr){
        Nodo aux = ptr.getDerecha();
        ptr.setDerecha(aux.getIzquierda());
        aux.setIzquierda(ptr);
        
        ptr.setAltura(Math.max(altura(ptr.getIzquierda()),altura(ptr.getDerecha())) + 1);
        aux.setAltura(Math.max(altura(aux.getIzquierda()),altura(aux.getDerecha())) + 1);
        return aux;
    }
    
    //me dio pereza codear alturas lo hice funcion :p FE es factor de equilibrio para calcular
    //si esta equilibrado o no
    public int FE(Nodo ptr){
        return altura(ptr.getDerecha()) - altura(ptr.getIzquierda());
    }
    
    //esta funcion verifica si esta equilibrado o no y hace los cambios respectivos 
    //para balancear el arbol
    public Nodo equilibrar(Nodo ptr){
        if (FE(ptr) > 1) {
            if (FE(ptr.getDerecha()) < 0) {
                ptr.setDerecha(rDer(ptr.getDerecha()));
            }
            ptr = rIzq(ptr);
        } else if (FE(ptr) < -1) {
            if (FE(ptr.getIzquierda()) > 0) {
                ptr.setIzquierda(rIzq(ptr.getIzquierda()));
            }
            ptr = rDer(ptr);
        }
        return ptr;
    }
    
    //Existen 3 vistas al arbol este es uno de ellos "preorden" y muestra los datos de 
    //la manera que veran al ejecutarlo en la vista no altera o cambia 
    //es solo visual el como muestra los datos en esta vista en especifica 
    //lee el arbol de izquierda a derecha para que se entienda o quede claro eso.
    public void preorden(Nodo ptr, int nivel){
        if(ptr != null){
            System.out.println(ptr.getValor() + " - Altura: " + ptr.getAltura() + " - Nivel: " + nivel);
            preorden(ptr.getIzquierda(), nivel + 1);
            preorden(ptr.getDerecha(), nivel +1);
        }
    }
}