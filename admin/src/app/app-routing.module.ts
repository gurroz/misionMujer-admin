import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from './auth/auth.component';
import {AppComponent} from './app.component';
import {NewsComponent} from './news/news.component';
import {TeachingsComponent} from './teachings/teachings.component';
import {CategoriesComponent} from './categories/categories.component';


const routes: Routes = [
  { path: 'login', component: AuthComponent }
  , { path: 'news', component: NewsComponent }
  , { path: 'teachings', component: TeachingsComponent }
  , { path: 'categories', component: CategoriesComponent }
  , { path: '', component: AppComponent }

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
