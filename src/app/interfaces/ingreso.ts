export interface Ingreso {
    _id?: any;
    ingresoId: number;
    solicitudId?: number;
    tenantId: string;
    fecha: Date | string;
    detalle: string;
    valor: number;
    tipo?: 'Ingreso';
  }
  