/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package dto;

/**
 *
 * @author Enrique
 */
public class Producto {
    private int codiProd;
    private String  nombProd;
    private double precProd;
    private double cantProd;
    private double costoProd;

    public Producto(int codiProd, String nombProd, double precProd, double cantProd, double costoProd) {
        this.codiProd = codiProd;
        this.nombProd = nombProd;
        this.precProd = precProd;
        this.cantProd = cantProd;
        this.costoProd = costoProd;
    }

    public Producto() {
    }

    public int getCodiProd() {
        return codiProd;
    }

    public void setCodiProd(int codiProd) {
        this.codiProd = codiProd;
    }

    public String getNombProd() {
        return nombProd;
    }

    public void setNombProd(String nombProd) {
        this.nombProd = nombProd;
    }

    public double getPrecProd() {
        return precProd;
    }

    public void setPrecProd(double precProd) {
        this.precProd = precProd;
    }

    public double getCantProd() {
        return cantProd;
    }

    public void setCantProd(double cantProd) {
        this.cantProd = cantProd;
    }

    public double getCostoProd() {
        return costoProd;
    }

    public void setCostoProd(double costoProd) {
        this.costoProd = costoProd;
    }

}
