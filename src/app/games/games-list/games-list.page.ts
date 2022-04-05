import { GamesApiService } from './../games-api.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { Game } from '../games.model';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.page.html',
  styleUrls: ['./games-list.page.scss'],
})
export class GamesListPage implements OnInit, ViewWillEnter {
  games: Game[];
  loading = false;

  constructor(
    private alertController: AlertController,
    private gamesApiService: GamesApiService,
    private messageService: MessageService,
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
    this.loading = true;
    this.gamesApiService.getGames().subscribe(
      (games) => {
        this.games = games;
        //this.loading = false;
      },
      () => {
        this.messageService.showMessage('Erro ao carregar a lista de jogos.', () => this.listGames());
        this.loading = false;
      }
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
      () => this.messageService.showMessage('Erro ao excluir o jogo.', () => this.remove(game))
    );
  }
}
