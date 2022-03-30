import { GamesApiService } from './../games-api.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Game } from '../games.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.page.html',
  styleUrls: ['./games-list.page.scss'],
})
export class GamesListPage implements OnInit, ViewWillEnter {
  games: Game[];

  constructor(
    private alertController: AlertController,
    private gamesApiService: GamesApiService,
    private toastController: ToastController,
  ) {
    this.games = [];
  }

  ngOnInit() {
    this.listGames();
  }

  ionViewWillEnter(): void {
    this.listGames();
  }

  listGames() {
    this.gamesApiService.getGames().subscribe(
      (games) => this.games = games,
      () => this.showMessage('Erro ao carregar a lista de jogos.', () => this.listGames())
    );
  }

  confirmRemove(game: Game) {
    this.alertController
      .create({
        header: 'Exclusão',
        message: `Você deseja excluir o game ${game.nome}?`,
        buttons: [
          {
            text: 'Sim',
            handler: () => this.remove(game),
          },
          {
            text: 'Não',
          },
        ],
      })
      .then((alert) => alert.present());
  }

  remove(game: Game) {
    this.gamesApiService.removeGame(game.id).subscribe(
      () => this.listGames(),  //  OOUUU     this.games.filter(g => g.id !== game.id)
      () => this.showMessage('Erro ao excluir o jogo.', () => this.remove(game))
    );
  }

  // É o onFail() do professor
  async showMessage(msg: string, handler: () => void) {
    const toast = await this.toastController.create({
      message : msg,
      color: "danger",
      duration: 4000,
      buttons: [
        {
          icon: "refresh-outline",
          side: "start",
          handler: () => handler(),
        },
        {
          side: "end",
          icon: "close-outline"
        }
      ]
    });
    toast.present();
  }
}
