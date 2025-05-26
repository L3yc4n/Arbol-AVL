
package dto;

import java.util.Date;

public class Docente {
    private String codigo;
    private String nombre;
    private String direccion;
    private Date fechanacimiento;
    private double talla;
    private String correo;

    public Docente(String codigo, String nombre, String direccion, Date fechanacimiento, double talla, String correo) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.direccion = direccion;
        this.fechanacimiento = fechanacimiento;
        this.talla = talla;
        this.correo = correo;
    }

    public Docente() {
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Date getFechanacimiento() {
        return fechanacimiento;
    }

    public void setFechanacimiento(Date fechanacimiento) {
        this.fechanacimiento = fechanacimiento;
    }

    public double getTalla() {
        return talla;
    }

    public void setTalla(double talla) {
        this.talla = talla;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
    
    
}
