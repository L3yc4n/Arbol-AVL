package dao;

import dto.Nodo;
import dto.Producto;
import javax.swing.JOptionPane;

/**
 *
 * @author Enrique
 */
public class listaEnlazada {
    private Nodo cabeza;

    public listaEnlazada() {
        cabeza = null;
    }
    
    public void insertarFinal(Producto producto){
        Nodo nuevoNodo = new Nodo(producto);
        if(cabeza == null){
            cabeza = nuevoNodo;
        } else {
            Nodo actual = cabeza;
            while(actual.getSiguiente() != null){
                actual = actual.getAnterior();
            } 
            actual.setSiguiente(nuevoNodo);
            nuevoNodo.setAnterior(actual);
        }
    }
    
    public void eliminarFinal(){
        if(cabeza == null){
            JOptionPane.showMessageDialog(null, "La lista esta Vacia, no hay nada que eliminar.");
        } else if(cabeza.getSiguiente() == null) {
            cabeza = null;
            JOptionPane.showMessageDialog(null, "La lista se ha vaciado.");
        } else {
            Nodo actual = cabeza;
            while(actual.getSiguiente().getSiguiente() != null){
                actual = actual.getSiguiente();
            }
            actual.setSiguiente(null);
            JOptionPane.showMessageDialog(null, "Se elimino el ultimo elemento.");
        }
    }
    
    public void mostrarEnlazadaAtras(){
        if(cabeza == null){
            JOptionPane.showMessageDialog(null, "La lista esta Vacia, no hay nada que mostrar.");
            return;
        } 
        Nodo actual = cabeza;
        while(actual.getSiguiente() != null){
            actual = actual.getSiguiente();
        }
        String mensaje = "Lista Enlazada - Producto\n";
        while(actual != null){
            Producto a = new Producto();
            mensaje += a.getCodiProd() + " - " + a.getNombProd() + " - " + a.getPrecProd() + " - " + a.getCantProd() + " - " + a.getCostoProd() + "\n";
            actual = actual.getAnterior();
        }
        JOptionPane.showMessageDialog(null, mensaje);
    }
    
    public double calcProm(){
        double prom = 0;
        if(cabeza == null){
            return 0;
        } 
        Nodo actual = cabeza;
        int tam = 0;
        while(actual != null){
            tam++;
            actual = actual.getSiguiente();
        }
        actual = cabeza;
        while(actual != null){
            Producto a = new Producto();
            prom += (a.getCantProd() + a.getCostoProd())/tam;
            actual = actual.getSiguiente();
        }
        return prom;
    }
}
