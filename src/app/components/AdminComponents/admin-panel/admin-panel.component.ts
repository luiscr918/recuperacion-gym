import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';

import { Usuario } from '../../../interfaces/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { FooterComponent } from '../../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  clientes: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

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
}
