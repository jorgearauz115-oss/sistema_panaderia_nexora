import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private router: Router) {}

  onLogin(event: Event) {
    event.preventDefault();
    // Redirección activa hacia el módulo POS
    this.router.navigate(['/ventas']);
  }
}