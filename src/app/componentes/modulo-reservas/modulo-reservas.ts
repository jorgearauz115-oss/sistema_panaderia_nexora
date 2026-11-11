import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-modulo-reservas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modulo-reservas.html',
  styleUrl: './modulo-reservas.css'
})
export class ModuloReservas {
  reservas = [
    { cliente: 'María Gómez', producto: 'Torta de Chocolate (Especial)', fecha: 'Mañana, 10:00 AM', estado: 'Pendiente' },
    { cliente: 'Carlos Ruiz', producto: 'Empanadas x50 (Evento)', fecha: 'Viernes, 15:30 PM', estado: 'Pendiente' }
  ];

  guardarReserva(cliente: string, fecha: string) {
    if (!cliente.trim() || !fecha) {
      alert('Por favor completa el nombre del cliente y la fecha de entrega.');
      return;
    }

    this.reservas.unshift({
      cliente: cliente,
      producto: 'Torta de Chocolate (Especial)',
      fecha: fecha,
      estado: 'Pendiente'
    });

    alert(`¡Reserva guardada con éxito para ${cliente}!`);
  }
}