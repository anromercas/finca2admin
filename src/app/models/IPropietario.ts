import { IComunidad } from './IComunidad';

export interface IPropietario {
    id?: string;
    nombre: string;
    telefono: number;
    piso: string;
    comunidad: IComunidad;
}
