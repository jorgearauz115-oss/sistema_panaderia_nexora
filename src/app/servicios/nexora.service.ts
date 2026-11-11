import { Injectable } from '@angular/core';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class NexoraService {
  private productos: Producto[] = [
    { id: 1, nombre: 'Pan de Batalla', precio: 0.50, stock: 120 },
    { id: 2, nombre: 'Marraqueta', precio: 0.50, stock: 150 },
    { id: 3, nombre: 'Pan Dulce', precio: 1.00, stock: 45 },
    { id: 4, nombre: 'Empanada Queso', precio: 3.50, stock: 30 },
    { id: 5, nombre: 'Bizcocho', precio: 1.50, stock: 60 }
  ];

  constructor() { }

  getProductos() {
    return this.productos;
  }

  registrarTanda(idProducto: number, cantidad: number) {
    const producto = this.productos.find(p => p.id === idProducto);
    if (producto) {
      producto.stock += cantidad;
    }
  }

  procesarVenta(itemsCarrito: { producto: Producto, cantidad: number }[]) {
    for (let item of itemsCarrito) {
      const producto = this.productos.find(p => p.id === item.producto.id);
      if (producto) {
        producto.stock -= item.cantidad;
        if (producto.stock < 0) producto.stock = 0;
      }
    }
  }
}