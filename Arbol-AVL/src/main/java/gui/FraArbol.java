package gui;

import dao.ABB;
import java.util.Scanner;

public class FraArbol {
    public static void main(String[] args) {
        Scanner leer = new Scanner(System.in);
        
        int n, a;
        System.out.println("Imprime la cantidad de numeros del arbol:");
        n = leer.nextInt();
        
        ABB ar = new ABB();
        
        for(int i=0;i<n;i++){
            System.out.println((i+1)+".- ");
            a = leer.nextInt();
            ar.raiz = ar.agregar(ar.raiz, a);
        }
        System.out.println("ARBOL-AVL: \n");
        ar.preorden(ar.raiz,0);
    }
}
