import { Cargo } from "../enums/cargo";

export interface Cocinero {
     id: number;
      nombre: string;
      dni: string;
      telefono: string;
      salario: number;
      usuario: string;
      password: string;
      cargos: Cargo[]; // Si usas Set en Java, Angular lo trata como un array
      fechaIngreso: string; // formato ISO tipo "2024-07-16"
      especialidad: string;
}
