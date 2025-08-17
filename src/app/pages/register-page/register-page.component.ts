import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  usuario: Partial<Usuario> = {
    rol: 'cliente', // Por defecto todos los registros son clientes
  };
  error = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    this.error = '';

    // Validación de campos obligatorios
    if (
      !this.usuario.email ||
      !this.usuario.password ||
      !this.usuario.nombre ||
      !this.usuario.cedula ||
      !this.usuario.peso ||
      !this.usuario.altura
    ) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }

    // Validar si el email ya existe
    this.usuarioService.buscarPorEmail(this.usuario.email!).subscribe({
      next: (usuarioExistente) => {
        if (usuarioExistente) {
          this.error = 'Este correo ya está registrado';
          return;
        }

        // Si no existe, crear usuario
        this.usuarioService
          .guardarUsuario({
            email: this.usuario.email!,
            password: this.usuario.password!,
            nombre: this.usuario.nombre!,
            cedula: this.usuario.cedula!,
            rol: 'cliente',
            peso: this.usuario.peso!,
            altura: this.usuario.altura!,
          })
          .subscribe({
            next: () => {
              alert('REGISTRO EXITOSO');
              this.router.navigateByUrl('/');
            },
            error: (err) => {
              console.error(err);
              this.error = 'Error al registrar usuario. Intenta nuevamente.';
            },
          });
      },
      error: (err) => {
        console.error(err);
        this.error = 'Error al validar el correo. Intenta nuevamente.';
      },
    });
  }
}
