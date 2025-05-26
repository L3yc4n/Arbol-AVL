/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package gui;

import dao.listaEnlazada;
import dto.Producto;
import javax.swing.JOptionPane;

/**
 *
 * @author Enrique
 */
public class FraProducto {
    listaEnlazada lista = new listaEnlazada();

    public void menu(){
        int opc;
        String mensaje = "Menu - Productos:\n";
        mensaje += "[1] Agregar a la Lista. \n"
                + "[2] Mostrar Lista \n"
                + "[3] Eliminar el ultimo Elemento.\n"
                + "[4] Calcular el Promedio General.\n"
                + "[5] Salir.\n"
                + "seleccione una opcion: ";
        do {
            opc = Integer.parseInt(JOptionPane.showInputDialog(mensaje));
            switch (opc) {
                case 1:
                    int codiProd = Integer.parseInt(JOptionPane.showInputDialog("Ingrese el codigo: "));
                    String  nombProd = JOptionPane.showInputDialog("Ingrese el nombre: ");
                    double precProd = Double.parseDouble(JOptionPane.showInputDialog("Ingrese el precio del producto: "));
                    double cantProd = Integer.parseInt(JOptionPane.showInputDialog("Ingrese la cantidad de Stock: "));
                    double costoProd = Double.parseDouble(JOptionPane.showInputDialog("Ingrese el costo del producto: "));;
                    Producto a = new Producto(codiProd,nombProd,precProd,cantProd,costoProd);
                    lista.insertarFinal(a);
                    break;
                case 2:
                    lista.mostrarEnlazadaAtras();
                    break;
                case 3:
                    lista.eliminarFinal();
                    break;
                case 4:
                    double prom = lista.calcProm();
                    String dato = "PROMEDIO GENERAL ACTUAL: \n";
                    dato +="Valor actual: " + prom;
                    JOptionPane.showMessageDialog(null, dato);
                    break;
                case 5:
                    break;
                default:
                    JOptionPane.showMessageDialog(null, "Error: Número no valido, reintente.");
                    break;
            }
        } while (opc != 5);
    }

    public static void main(String[] args){
        FraProducto nose = new FraProducto();
        nose.menu();
    }
}

