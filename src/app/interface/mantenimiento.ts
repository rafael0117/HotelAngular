import { Cargo } from "../enums/cargo";

export interface Mantenimiento {
     id: number;
        nombre: string;
        dni: string;
        telefono: string;
        salario: number;
        usuario: string;
        password: string;
        cargos: Cargo[]; // Si usas Set en Java, Angular lo trata como un array
        fechaIngreso: string; // formato ISO tipo "2024-07-16"
        disponible: boolean;
        areaResponsable: string;
}
