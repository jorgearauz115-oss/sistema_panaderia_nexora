import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NexoraService } from '../../servicios/nexora.service';

@Component({
  selector: 'app-modulo-produccion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modulo-produccion.html',
  styleUrl: './modulo-produccion.css',
})
export class ModuloProduccion {
  constructor(private nexoraService: NexoraService) {}

  registrarTanda(idStr: string, cantidadStr: string) {
    const id = Number(idStr);
    const cantidad = Number(cantidadStr);

    if (cantidad <= 0 || isNaN(cantidad)) {
      alert('Por favor ingresa una cantidad válida.');
      return;
    }

    this.nexoraService.registrarTanda(id, cantidad);
    alert(`¡Tanda registrada con éxito! Se sumaron ${cantidad} unidades al inventario.`);
  }
}