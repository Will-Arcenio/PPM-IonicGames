import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from './games.model';

@Injectable({
  providedIn: 'root'
})
export class GamesApiService {

  constructor(
    private httpCliente: HttpClient,
  ) { }

  getGames(): Observable<Game[]> {
    return this.httpCliente.get<Game[]>(`${environment.apiUrl}/games`);
  }

  removeGame(id: number) {
    return this.httpCliente.delete<void>(`${environment.apiUrl}/games/${id}`);
  }

  findById(id: number) {
    return this.httpCliente.get<Game>(`${environment.apiUrl}/games/${id}`);
  }

  save(game: Game): Observable<Game> {
    if(game.id) {
      return this.httpCliente.put<Game>(`${environment.apiUrl}/games/${game.id}`, game);
    }
    return this.httpCliente.post<Game>(`${environment.apiUrl}/games`, game);
  }
}
