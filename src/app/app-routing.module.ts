import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardsListPageComponent } from './cards-list-page/cards-list-page.component';
import { CardPageComponent } from './card-page/card-page.component';

const routes: Routes = [
  { path: '', component: CardsListPageComponent },
  { path: 'media/:id', component: CardPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
