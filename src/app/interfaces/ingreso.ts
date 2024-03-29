export interface Ingreso {
    _id?: any;
    ingresoId: number;
    tenantId: string;
    fecha: Date | string;
    detalle: string;
    valor: number;
    tipo?: 'Ingreso';
  }
  