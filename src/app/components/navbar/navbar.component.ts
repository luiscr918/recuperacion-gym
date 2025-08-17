import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMenuOpen = false;
  usuarioLogueado = false;

  constructor(private router: Router) {
    // Comprobar si hay usuario en localStorage
    this.usuarioLogueado = !!localStorage.getItem('user');
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  cerrarSesion() {
    localStorage.removeItem('user');
    this.usuarioLogueado = false;
    this.router.navigateByUrl('/login');
  }
}
