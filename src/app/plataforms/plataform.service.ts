import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plataform } from './plataform.model';

@Injectable({
  providedIn: 'root'
})
export class PlataformService {

  constructor(
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<Plataform[]> {
    return this.httpClient.get<Plataform[]>(`${environment.apiUrl}/plataforms`);
  }

  save(platform: Plataform) {
    return this.httpClient.post(`${environment.apiUrl}/plataforms`, platform);
  }
}
