import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlataformsPage } from './plataforms.page';

const routes: Routes = [
  {
    path: '',
    component: PlataformsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlataformsPageRoutingModule {}
