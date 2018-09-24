import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {AppRoutingModule} from './app-routing.module';
import { NewsComponent } from './news/news.component';
import { TeachingsComponent } from './teachings/teachings.component';
import { CategoriesComponent } from './categories/categories.component';
import {CategoriesService} from './categories/categories.service';
import {NewsService} from './news/news.service';
import {TeachingsService} from './teachings/teachings.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    TeachingsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [CategoriesService, NewsService, TeachingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
