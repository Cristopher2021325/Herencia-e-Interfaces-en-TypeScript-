export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  stock: number;
  categoria: string;
}

export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono?: string;
}
