import { Acoes } from './acoes';

export interface Investimentos {
    nome: string;
    objetivo?: string;
    saldoTotalDisponivel: number;
    indicadorCarencia: 'S' | 'N';
    acoes?: Acoes[];
}
