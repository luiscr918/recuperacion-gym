// src/app/pages/login-page/login-page.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    NavbarComponent,
    RouterLink,
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email = '';
  password = '';
  error = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Debe completar todos los campos';
      return;
    }

    // Buscar usuario por email
    this.usuarioService.leerUsuarios().subscribe({
      next: (usuariosMap) => {
        const usuarios = Object.entries(usuariosMap || {}).map(([id, u]) => ({
          id,
          ...u,
        })) as Usuario[];

        const usuario = usuarios.find(
          (u) => u.email.toLowerCase() === this.email.toLowerCase()
        );

        if (!usuario) {
          this.error = 'El correo no está registrado';
          return;
        }

        if (usuario.password !== this.password) {
          this.error = 'Contraseña incorrecta';
          return;
        }

        localStorage.setItem('user', JSON.stringify(usuario)); // <-- Esto faltaba
        alert('¡Login exitoso!');

        // Redirige según rol
        if (usuario.rol === 'admin') {
          this.router.navigateByUrl(`/panel-admin/${usuario.id}`);
        } else {
          this.router.navigateByUrl(`/panel-cliente/${usuario.id}`);
        }
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al intentar iniciar sesión';
      },
    });
  }
}
