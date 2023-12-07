import { CdkDropList } from '@angular/cdk/drag-drop';
import { Cartao, ICartao } from './kanban-card';

export class MoverCartaoColunaRequest {
  colunaAntiga?: any[];
  colunaAtual?: any[];
  NomeConlunaAnterior: string;
  NomeColunaIndex: string;
  idBoard: number | null;
  constructor(params: Partial<MoverCartaoColunaRequest>) {
    this.colunaAntiga = params.colunaAntiga || [];
    this.colunaAtual = params.colunaAtual || [];
    this.NomeConlunaAnterior = params.NomeConlunaAnterior || '';
    this.NomeColunaIndex = params.NomeColunaIndex || '';
    this.idBoard = params.idBoard || null;
  }
}
