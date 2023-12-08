import { ListaBoard } from './../models/types/listboard';
import { BoardNome } from './../../cards/models/board-nome.response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  Cartao,
  CartaoEdicaoRequest,
  CartaoEditarRequest,
  ICartao,
  KanbanCard,
} from '../models/types/kanban-card';
import { KanbanList } from '../models/types/kanban-list';
import { KanbanPipeline } from '../models/types/kanban-pipeline';
import { Board, IBoard } from '../models/types/board';
import {
  BoardMain,
  CreateBoardResquest,
} from '../../boards/models/interface/create-board-resquest';
import {
  AdicionarColunaRequest,
  Coluna,
  IColuna,
} from '../models/types/colunas';
import {
  IColunaCartao,
  IColunasListagem,
  TituloRequest,
} from '../models/types/colunaCartao';
import { MoverCartaoColunaRequest } from '../models/types/atualizarCartao';
import { EditBoardRequest } from '../../boards/models/interface/edit-board-request';

@Injectable()
export class KanbanService {
  urlbase = 'https://localhost:7142/';

  private _lists: KanbanList[] = [];

  private _colunas: IColunaCartao[] = [];

  private _board: Board[] = [];

  private spinner = new BehaviorSubject<boolean>(false);

  public spinner$ = this.spinner.asObservable();

  private _openModal = new BehaviorSubject<boolean>(false);

  public openModal$ = this._openModal.asObservable();

  private selectedCard = new Subject<KanbanCard>();
  private selectedCartao = new Subject<ICartao>();

  private selectedListId = new Subject<string>();

  private lists = new BehaviorSubject<KanbanList[]>(this._lists);
  public board = new BehaviorSubject<Board[]>(this._board);

  public colunas = new BehaviorSubject<Array<IColunaCartao>>(this._colunas);

  private listNames = new Subject<any[]>();
  private selectBoard = new Subject<Board>();
  public editar = new BehaviorSubject<boolean>(false);

  editar$ = this.editar.asObservable();
  board$ = this.board.asObservable();

  selectId = new Subject<number>();

  selectId$ = this.selectId.asObservable();

  selectBoard$ = this.selectBoard.asObservable();
  lists$ = this.lists.asObservable();
  colunas$ = this.colunas.asObservable();

  selectedCard$ = this.selectedCard.asObservable();
  selectedCartao$ = this.selectedCartao.asObservable();

  selectedListId$ = this.selectedListId.asObservable();

  listNames$ = this.listNames.asObservable();

  constructor(private http: HttpClient) {}

  updateBoard(board: Array<Board>) {
    this.board.next(board);
  }

  hideSpinner() {
    this.spinner.next(true);
  }

  showSpinner() {
    this.spinner.next(false);
  }

  openModal() {
    this._openModal.next(true);
  }
  showModal() {
    this._openModal.next(false);
  }

  onCardSelect(card: KanbanCard, listId: string) {
    this.selectedCard.next(card);
    this.selectedListId.next(listId);
  }

  onCartaoSelect(card: ICartao) {
    this.selectedCartao.next(card);
  }

  onSelectBoard(board: Board) {
    this.selectBoard.next(board);
  }

  getBaords(): Observable<Array<Board>> {
    return this.http.get<Array<Board>>(this.urlbase + 'board/listar');
  }

  getColunas(id: number) {
    return this.http.get<IColunasListagem>(
      this.urlbase + 'colunas/Listar/' + id
    );
  }

  addBoard(board: CreateBoardResquest): Observable<any> {
    return this.http.post<any>(this.urlbase + 'board/Adicionar', board);
  }

  addColuna(coluna: AdicionarColunaRequest): Observable<IColuna> {
    return this.http.post<IColuna>(this.urlbase + 'colunas/Adicionar', coluna);
  }
  getCartoes(id: number): Observable<Array<ICartao>> {
    return this.http.get<Array<ICartao>>(this.urlbase + 'cartoes/listar' + id);
  }

  atualizarTituloColuna(id: number, titulo: TituloRequest): Observable<any> {
    return this.http.put<any>(this.urlbase + 'colunas/atualizar/' + id, titulo);
  }

  moverCartaoCaluna(request: MoverCartaoColunaRequest): Observable<any> {
    return this.http.put<any>(this.urlbase + 'cartoes/atualizar', request);
  }

  recuperarNomeBoard() {
    return this.http.get<Array<BoardNome>>(
      this.urlbase + 'board/recuperarNome'
    );
  }
  isMobileDevice() {
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      /(android)/i.test(navigator.userAgent)
    );
  }

  listarCartoes(idboard: number): Observable<any> {
    return this.http.get<any>(this.urlbase + 'cartoes/Listar/todos/' + idboard);
  }

  editarBoard(idboard: any, request: EditBoardRequest): Observable<any> {
    return this.http.put<any>(
      this.urlbase + 'board/editar/' + idboard,
      request
    );
  }

  exibirBoards(): Observable<Array<Board>> {
    return this.http.get<Array<Board>>(this.urlbase + 'board/listar');
  }

  deleterColuna(idColuna: number): Observable<any> {
    return this.http.delete<any>(this.urlbase + 'colunas/Deletar/' + idColuna);
  }

  deletetarBoard(idBoard: any): Observable<any> {
    return this.http.delete<any>(this.urlbase + 'board/deletar/' + idBoard);
  }

  adicionarCartao(idColuna: any): Observable<any> {
    return this.http.post<any>(
      this.urlbase + 'cartoes/adicionar/' + idColuna,
      null
    );
  }

  editarCartao(
    idCartao: number | null,
    request: CartaoEdicaoRequest
  ): Observable<any> {
    return this.http.put<any>(
      this.urlbase + 'cartoes/editar/' + idCartao,
      request
    );
  }

  deletarCartao(idCartao: number | null): Observable<any> {
    return this.http.delete<any>(this.urlbase + 'cartoes/Deletar/' + idCartao);
  }
}
