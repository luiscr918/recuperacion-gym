import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-cliente',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,CommonModule],
  templateUrl: './panel-cliente.component.html',
  styleUrls: ['./panel-cliente.component.css'],
})
export class PanelClienteComponent implements OnInit {
  cliente: Usuario | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.buscarUsuarioById(id).subscribe({
        next: (usuario) => {
          this.cliente = usuario;
        },
        error: (err) => {
          console.error('Error al obtener cliente', err);
        },
      });
    }
  }

  // Evaluar IMC
  evaluarIMC(): string {
    if (!this.cliente) return '';
    const imc = this.cliente.imc ?? 0;
    if (imc < 18.5) return 'Bajo peso';
    else if (imc < 25) return 'Normal';
    else if (imc < 30) return 'Sobrepeso';
    else return 'Obesidad';
  }

  // Color según IMC
  colorIMC(): string {
    if (!this.cliente) return '';
    const imc = this.cliente.imc ?? 0;
    if (imc < 18.5) return 'text-yellow-400';
    else if (imc < 25) return 'text-green-400';
    else if (imc < 30) return 'text-yellow-500';
    else return 'text-red-500';
  }

 calcularDiasRestantes(fechaFin?: string | Date | null): number {
  if (!fechaFin) return 0;
  const fin = new Date(fechaFin);
  const hoy = new Date();
  const diffMs = fin.getTime() - hoy.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
}
