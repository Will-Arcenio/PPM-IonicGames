import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesWishListPageRoutingModule } from './games-wish-list-routing.module';

import { GamesWishListPage } from './games-wish-list.page';
import { GeneroPipe } from '../games-list/genero.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesWishListPageRoutingModule
  ],
  declarations: [GamesWishListPage, GeneroPipe]
})
export class GamesWishListPageModule {}
