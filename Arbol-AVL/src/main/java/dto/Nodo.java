package dto;

public class Nodo {
    private int inferior;
    private Nodo izquierda;
    private Nodo derecha;
    private int contador;
    private int altura;
    
    public Nodo(int valor){
        inferior = valor;
        izquierda = null;
        derecha = null;
        contador = 1;
        altura = 1;
    }

    public int getInferior() {
        return inferior;
    }

    public void setInferior(int inferior) {
        this.inferior = inferior;
    }

    public Nodo getIzquierda() {
        return izquierda;
    }

    public void setIzquierda(Nodo izquierda) {
        this.izquierda = izquierda;
    }

    public Nodo getDerecha() {
        return derecha;
    }

    public void setDerecha(Nodo derecha) {
        this.derecha = derecha;
    }

    public int getContador() {
        return contador;
    }

    public void setContador(int contador) {
        this.contador = contador;
    }

    public int getAltura() {
        return altura;
    }

    public void setAltura(int altura) {
        this.altura = altura;
    }
}