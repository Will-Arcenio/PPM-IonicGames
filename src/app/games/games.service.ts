import { Injectable } from '@angular/core';

import { Game } from './games.model';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  private games: Game[];
  private contador = 1;

  constructor() {
    this.games = JSON.parse(localStorage.getItem('games')) ?? [];
  }

  public getGames() {
    return this.games;
  }

  public remove(nome: string) {
    this.games = this.games.filter((game) => game.nome !== nome);
    localStorage.setItem('games', JSON.stringify(this.games));
  }

  public save(game: Game) {
    if (game.id) {
      const index = this.games.findIndex(g => g.id === game.id);
      this.games[index] = game;
    } else {
      const id = this.contador++;
      this.games.push({ ...game, id });
    }
    localStorage.setItem('games', JSON.stringify(this.games));
  }

  public findById(id: number) {
    return this.games.find(game => game.id === id);
  }
}
