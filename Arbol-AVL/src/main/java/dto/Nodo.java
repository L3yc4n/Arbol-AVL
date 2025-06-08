package dto;

public class Nodo {
    private int valor;
    private Nodo izquierda;
    private Nodo derecha;
    private int contador;
    private int altura;
    
    public Nodo(int valor){
        this.valor = valor;
        izquierda = null;
        derecha = null;
        contador = 1;
        altura = 1;
    }

    public int getValor() {
        return valor;
    }

    public void setValor(int valor) {
        this.valor = valor;
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

    public void incrementarContador() {
        this.contador++;
    }

    public int getAltura() {
        return altura;
    }

    public void setAltura(int altura) {
        this.altura = altura;
    }
}