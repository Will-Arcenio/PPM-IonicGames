import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlataformsPageRoutingModule } from './plataforms-routing.module';

import { PlataformsPage } from './plataforms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlataformsPageRoutingModule
  ],
  declarations: [PlataformsPage]
})
export class PlataformsPageModule {}
