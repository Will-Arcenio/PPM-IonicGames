import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';
import { GamesListPageRoutingModule } from './games-list-routing.module';
import { GamesListPage } from './games-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesListPageRoutingModule,
    SharedModule
  ],
  declarations: [GamesListPage]
})
export class GamesListPageModule {}
