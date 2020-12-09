import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsListPageComponent } from './cards-list-page/cards-list-page.component';
import { CardPageComponent } from './card-page/card-page.component';
import { CardsListComponent } from './cards-list-page/cards-list/cards-list.component';
import { CardItemComponent } from './cards-list-page/card-item/card-item.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { FiltersComponent } from './cards-list-page/filters/filters.component';
import { LoadingComponent } from './common/loading/loading.component';
import { ErrorComponent } from './common/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsListPageComponent,
    CardPageComponent,
    CardsListComponent,
    CardItemComponent,
    PaginationComponent,
    FiltersComponent,
    LoadingComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'https://graphql.anilist.co',
            method: 'POST',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
