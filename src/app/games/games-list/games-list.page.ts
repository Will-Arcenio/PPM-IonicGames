import { GamesApiService } from './../games-api.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding, ToastController, ViewWillEnter } from '@ionic/angular';
import { Game } from '../games.model';
import { MessageService } from '../../services/message.service';
import { finalize } from 'rxjs/operators';
import { GamesWishListService } from '../games-wish-list.service';

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
    private gamesWishListService: GamesWishListService
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
    this.gamesApiService.getGames().pipe(finalize(() => this.loading = false)).subscribe(
      (games) => {
        this.games = games;
      },
      () => {
        this.messageService.showMessage('Erro ao carregar a lista de jogos.', () => this.listGames());
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
    this.loading = true;
    this.gamesApiService.removeGame(game.id).subscribe(
      () => {
        this.messageService.success(`Jogo ${game.nome} removido com sucesso.`);
        this.listGames();  //  OOUUU     this.games.filter(g => g.id !== game.id)
      },
      () => {
        this.messageService.showMessage('Erro ao excluir o jogo.', () => this.remove(game));
        this.loading = false;
      }
    );
  }

  addWishList(game: Game) {
    this.gamesWishListService.addGameOnWishList(game);
  }

  closeSliding(sliding: IonItemSliding) {
    sliding.close();
  }
}
