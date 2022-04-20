import { Component, OnInit } from '@angular/core';
import { Game } from '../games.model';
import { GamesWishListService } from '../games-wish-list.service';

@Component({
  selector: 'app-games-wish-list',
  templateUrl: './games-wish-list.page.html',
  styleUrls: ['./games-wish-list.page.scss'],
})
export class GamesWishListPage implements OnInit {
  games: Game[];
  loading = false;

  constructor(private gamesWishList: GamesWishListService) { }

  ngOnInit() {
    this.loadWishList();
  }

  loadWishList() {
    this.loading = true;
    this.gamesWishList.getWishList().subscribe((games) => {
      this.games = games;
      this.loading = false;
    });
  }

  remove(game: Game) {
    this.gamesWishList.removeGameOfWishList(game);
    this.loadWishList();
  }
}
