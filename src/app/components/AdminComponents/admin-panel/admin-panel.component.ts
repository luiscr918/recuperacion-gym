import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';

import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  irARegistroCliente() {
    this.router.navigateByUrl('/register');
  }
  clientes: Usuario[] = [];
  mostrarModal = false;
  clienteEdit: Partial<Usuario> = {};
  error = '';


  ngOnInit(): void {
    this.usuarioService.leerUsuarios().subscribe({
      next: (usuariosMap) => {
        // Convertimos el objeto de Firebase a un array
        this.clientes = Object.entries(usuariosMap || {}).map(([id, u]) => ({
          id,
          ...u,
        })) as Usuario[];
      },
      error: (err) => {
        console.error('Error al cargar clientes', err);
      },
    });
  }
  eliminarCliente(id?: string) {
    if (!id) return; // si es undefined, no hace nada
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return;

    this.usuarioService.eliminarUsuario(id).subscribe({
      next: () => {
        alert('Cliente eliminado correctamente');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar cliente', err);
        alert('No se pudo eliminar el cliente. Intenta nuevamente.');
      },
    });
  }
  editarCliente(id?: string) {
    const cliente = this.clientes.find(c => c.id === id);
    if (cliente) {
      this.clienteEdit = { ...cliente };
      this.mostrarModal = true;
      this.error = '';
    }
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.clienteEdit = {};
    this.error = '';
  }

  actualizarCliente() {
    this.error = '';
    if (!this.clienteEdit.id || !this.clienteEdit.nombre || !this.clienteEdit.email || !this.clienteEdit.cedula || !this.clienteEdit.peso || !this.clienteEdit.altura || !this.clienteEdit.password) {
      this.error = 'Todos los campos son obligatorios';
      return;
    }
    this.usuarioService.actualizarUsuario(this.clienteEdit.id, {
      nombre: this.clienteEdit.nombre,
      email: this.clienteEdit.email,
      cedula: this.clienteEdit.cedula,
      peso: this.clienteEdit.peso,
      altura: this.clienteEdit.altura,
      rol: this.clienteEdit.rol || 'cliente',
      password: this.clienteEdit.password,
    }).subscribe({
      next: () => {
        alert('Datos actualizados correctamente');
        this.cerrarModal();
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al actualizar cliente', err);
        this.error = 'No se pudo actualizar el cliente. Intenta nuevamente.';
      },
    });
  }
}
