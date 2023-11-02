import { Coluna } from './colunas';

export interface Board {
  id: number;
  nome: string;
  descricao: string;
  colunas: Coluna[] | null;
}
