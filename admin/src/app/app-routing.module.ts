import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from './auth/auth.component';
import {AppComponent} from './app.component';


const routes: Routes = [
  { path: 'login', component: AuthComponent }
  , { path: '', component: AppComponent }

];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
