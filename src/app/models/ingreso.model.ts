export interface Ingreso {
    ingresoId?: number;
    fecha: string;
    detalle: string;
    valor: number;
    aprobadoPor?: {
      nombre: string;
    };
  }
  