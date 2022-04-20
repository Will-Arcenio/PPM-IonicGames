import { Injectable } from '@angular/core';
import { Game } from './games.model';
import { GamesApiService } from './games-api.service';
import { forkJoin, Observable, of } from 'rxjs';
import { MessageService } from '../services/message.service';

@Injectable({
  providedIn: 'root'
})
export class GamesWishListService {

  gamesId: number[];

  constructor(
    private gamesApiService: GamesApiService,
    private messageService: MessageService
  ) {
    this.gamesId = JSON.parse(localStorage.getItem('wishlist')) ?? [];
  }

  getWishList(): Observable<Game[]> {
    const requests = this.gamesId.map(
      (gameId) => {
        this.gamesApiService.findById(gameId);
    });
    if(requests.length){
      return of([])
    }
    return (requests.length ? forkJoin(requests) : of([]));
  }

  // add() do professor
  addGameOnWishList({id, nome}: Game) {
    if(this.gamesId.some((gameId) => gameId === id)) {
      this.messageService.showMessage(`Jogo '${nome}' já está na sua lista de desejos.`);
      return;
    }

    this.gamesId = [...this.gamesId, id];
    localStorage.setItem('wishlist', JSON.stringify(this.gamesId));
    this.messageService.success(`Jogo '${nome}' adicionado à sua lista de desejos.`);
  }

  removeGameOfWishList({id, nome}: Game) {
    this.messageService.success(`Jogo '${nome}' removido da sua lista de desejos.`);
    this.gamesId = this.gamesId.filter((gameId) => gameId !== id);
    localStorage.setItem('wishlist', JSON.stringify(this.gamesId));
  }
}
