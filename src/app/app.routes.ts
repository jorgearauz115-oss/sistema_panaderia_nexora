import { Routes } from '@angular/router';
import { ModuloVentas } from './componentes/modulo-ventas/modulo-ventas';
import { ModuloProduccion } from './componentes/modulo-produccion/modulo-produccion';
import { ModuloReservas } from './componentes/modulo-reservas/modulo-reservas';
// Importa tu componente de login (ajusta el nombre si es distinto, ej: LoginComponent)
import { Login } from './componentes/login/login'; 

export const routes: Routes = [
  { path: 'login', component: Login }, // <-- Ruta de login agregada
  { path: '', component: ModuloVentas },
  { path: 'ventas', component: ModuloVentas },
  { path: 'produccion', component: ModuloProduccion },
  { path: 'reservas', component: ModuloReservas },
  { path: '**', redirectTo: '' }
];