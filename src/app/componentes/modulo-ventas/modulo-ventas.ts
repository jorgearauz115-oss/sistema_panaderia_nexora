import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NexoraService, Producto } from '../../servicios/nexora.service';

@Component({
  selector: 'app-modulo-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './modulo-ventas.html',
  styleUrl: './modulo-ventas.css'
})
export class ModuloVentas implements OnInit {
  productos: Producto[] = [];
  carrito: { producto: Producto, cantidad: number }[] = [];
  filtroBusqueda: string = '';
  
  // Control del Modal de Cobro
  mostrarModalCobro: boolean = false;
  metodoPago: string = 'efectivo';
  montoRecibido: number = 0;

  constructor(
    private nexoraService: NexoraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productos = this.nexoraService.getProductos();
  }

  getProductosFiltrados(): Producto[] {
    if (!this.filtroBusqueda.trim()) return this.productos;
    return this.productos.filter(p => p.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()));
  }

  agregarAlCarrito(prod: Producto) {
    if (prod.stock <= 0) {
      alert('¡Producto sin stock disponible!');
      return;
    }

    const itemExistente = this.carrito.find(item => item.producto.id === prod.id);
    if (itemExistente) {
      if (itemExistente.cantidad < prod.stock) {
        itemExistente.cantidad++;
      } else {
        alert('No hay más stock disponible.');
      }
    } else {
      this.carrito.push({ producto: prod, cantidad: 1 });
    }
  }

  cambiarCantidad(item: any, delta: number) {
    const nuevaCantidad = item.cantidad + delta;
    if (nuevaCantidad <= 0) {
      this.carrito = this.carrito.filter(i => i !== item);
    } else if (nuevaCantidad <= item.producto.stock) {
      item.cantidad = nuevaCantidad;
    } else {
      alert('Stock máximo alcanzado.');
    }
  }

  actualizarCantidadManual(item: any, event: any) {
    const val = parseInt(event.target.value, 10);
    if (isNaN(val) || val <= 0) {
      this.carrito = this.carrito.filter(i => i !== item);
    } else if (val <= item.producto.stock) {
      item.cantidad = val;
    } else {
      alert('La cantidad supera el stock disponible.');
      item.cantidad = item.producto.stock;
      event.target.value = item.producto.stock;
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
  }

  calcularCambio(): number {
    const total = this.calcularTotal();
    return this.montoRecibido > total ? this.montoRecibido - total : 0;
  }

  // Abre el modal de pago si hay productos
  abrirModalCobro() {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    this.montoRecibido = this.calcularTotal(); // Por defecto sugerimos el exacto
    this.mostrarModalCobro = true;
  }

  cerrarModalCobro() {
    this.mostrarModalCobro = false;
  }

  // Finaliza la venta
  procesarCobroFinal() {
    if (this.metodoPago === 'efectivo' && this.montoRecibido < this.calcularTotal()) {
      alert('El monto recibido en efectivo es menor al total a pagar.');
      return;
    }

    this.nexoraService.procesarVenta(this.carrito);
    alert(`¡Venta cobrada con éxito vía ${this.metodoPago.toUpperCase()}! Stock actualizado.`);
    
    // Limpieza
    this.carrito = [];
    this.montoRecibido = 0;
    this.mostrarModalCobro = false;
    this.productos = this.nexoraService.getProductos();
  }

  cerrarSesion() {
    this.router.navigateByUrl('/login');
  }
}