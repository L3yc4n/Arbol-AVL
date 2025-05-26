
package dao;

import dto.Docente;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;



public class arrayDocente {
        private List<Docente> lista = new ArrayList<>();
    private int ubi = -1;
    
    public void agregar(Docente d){
        lista.add(d);
        ubi = lista.size()-1;
    }
    SimpleDateFormat sdf=new SimpleDateFormat("dd/MM/yy");
    public String mostrar(){
       String resultado=" ";
        for (Docente docente : lista) {
            resultado += docente.getCodigo()+" - "+docente.getNombre()+" - "+docente.getDireccion()+" - "+sdf.format(docente.getFechanacimiento())+" - "+docente.getTalla()+" - "+docente.getCorreo()+"\n";
        }
        return resultado;
    }
    public void primero(){
        ubi = 0;
    }
    
    public void anterior(){
        if(ubi > 0){
            ubi--;
        }
    }
    
    public void siguiente(){
        if(ubi < lista.size() - 1 ){
            ubi++;
        }
    }
    
    public void ultimo(){
        ubi = lista.size() - 1;
    }
    
    public Docente getDocente(){
        if(ubi >= 0 && ubi < lista.size()){
            return lista.get(ubi);
        }
        return null;
    }
    
    public void setDocente(Docente a){
        lista.set(ubi, a);
    }
    
    public boolean es_vacio (){
        return lista.isEmpty();
    }
    
    public void eliminar(){
//         if (lista.isEmpty()) {
//            lista.remove(ubi);
//        }else if(ubi>=lista.size()){
//            ubi=lista.size()-1;
//        }
//         
         
          if (!es_vacio()) {
            lista.remove(ubi);
            if (lista.isEmpty()) {
                ubi = -1; // no hay anda mas
            } else if (ubi >= lista.size()) {
                ubi = lista.size() - 1; 
            }
        }
    }
    
}//Final