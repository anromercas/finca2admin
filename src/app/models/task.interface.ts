import { IComunidad } from './IComunidad';
export interface ITask {
    id?: string;
    nombre: string;
    info: string;
    prioridad: string;
    realizada: boolean;
    creada: number;
    fechaRealizada?: number;
    comunidad?: IComunidad;
}
