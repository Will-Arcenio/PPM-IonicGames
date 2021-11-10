import { Component, OnInit } from '@angular/core';
import { Game, Genero } from '../games.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.page.html',
  styleUrls: ['./games-list.page.scss'],
})
export class GamesListPage implements OnInit {

  games: Game[];

  constructor() {
    this.games = [
      {
        nome: 'Rainbow Six:Siege',
        genero: Genero.FPS,
        preco: 80.00,
        lancamento: new Date(2015,11,20),
        foto: 'https://cdn1.epicgames.com/carnation/offer/r6s-y6-epic-std-store-landscape-2560x1440-2560x1440-ada4045f97c2-2560x1440-1a29dde6790c324f62bb12216e651944.jpeg'
      },
      {
        nome: 'CS:GO', 
        genero: Genero.FPS, 
        lancamento: new Date(2021,10,11), 
        preco: 29.90, 
        foto: 'https://th.bing.com/th/id/OIP.SWYgOJ8CrbBMQuP4-jHeigHaEK?w=310&h=180&c=7&r=0&o=5&pid=1.7'
      },
      {
        nome: 'FIFA 22',
        genero: Genero.ESPORTES,
        preco: 299.90,
        lancamento: new Date(2022,8,17),
        foto: 'https://tm.ibxk.com.br/2021/10/05/05164344193348.jpg'
      },
      {
        nome: 'Assassins Creed Unity',
        genero: Genero.ACAO,
        preco: 59.90,
        lancamento: new Date(2014,12,13),
        foto: 'https://smartcdkeys.com/image/data/products/assassins-creed-unity-ps4/cover/assassins-creed-unity-ps4-smartcdkeys-cheap-cd-key-cover.jpg'
     }
    ];
  }

  ngOnInit() {
  }

}
