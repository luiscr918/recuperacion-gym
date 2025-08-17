import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private API_USUARIOS = 'https://app-gym-74b74-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  // Crear usuario con cálculo automático de IMC y fechas
  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    const fechaRegistro = new Date();
    const fechaFin = this.addOneMonth(fechaRegistro);
    const imc = this.calcIMC(usuario.peso, usuario.altura);

    const usuarioFinal: Usuario = {
      ...usuario,
      imc,
      fechaRegistro,
      fechaFin,
    };

    return this.http.post<Usuario>(
      `${this.API_USUARIOS}/usuarios.json`,
      usuarioFinal
    );
  }

  // Leer todos los usuarios
  leerUsuarios(): Observable<{ [key: string]: Usuario }> {
    return this.http.get<{ [key: string]: Usuario }>(
      `${this.API_USUARIOS}/usuarios.json`
    );
  }

  // Buscar usuario por ID
  buscarUsuarioById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_USUARIOS}/usuarios/${id}.json`);
  }

  // Eliminar usuario
  eliminarUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_USUARIOS}/usuarios/${id}.json`);
  }

  // Actualizar usuario
  actualizarUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    // Recalcula IMC si cambió peso o altura
    const imc = this.calcIMC(usuario.peso, usuario.altura);
    const usuarioFinal: Usuario = { ...usuario, imc };
    return this.http.put<Usuario>(
      `${this.API_USUARIOS}/usuarios/${id}.json`,
      usuarioFinal
    );
  }

  // ---- Helpers ----
  private calcIMC(peso: number, altura: number): number {
    return +(peso / (altura * altura)).toFixed(2);
  }

  private addOneMonth(d: Date): Date {
    const x = new Date(d);
    x.setMonth(x.getMonth() + 1);
    return x;
  }

  buscarPorEmail(email: string): Observable<Usuario | null> {
    const params = new HttpParams()
      .set('orderBy', '"email"') // comillas dobles necesarias
      .set('equalTo', `"${email}"`); // comillas dobles para Firebase

    return this.http
      .get<{ [key: string]: Usuario } | null>(
        `${this.API_USUARIOS}/usuarios.json`,
        { params }
      )
      .pipe(
        map((res) => {
          if (!res) return null;
          // Obtiene el primer usuario que coincida
          const [id, usuario] = Object.entries(res)[0] || [];
          return id ? { id, ...usuario } : null;
        })
      );
  }
}
