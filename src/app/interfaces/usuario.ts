export interface Usuario {
  id?: string;        // ID generado automáticamente (por ejemplo en Firebase)
  email: string;      // Email del usuario
  password: string;   // Contraseña (en producción se debe encriptar)
  nombre: string;     // Nombre completo
  cedula: string;     // Número de cédula
  rol: 'cliente' | 'admin'; // Rol del usuario
  peso: number;       // Peso en kilogramos
  altura: number;     // Altura en metros
  imc?: number;       // IMC calculado automáticamente
  fechaRegistro?: Date; // Fecha en la que se registra
  fechaFin?: Date;      // Fecha de vencimiento (1 mes después)
}