import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthComponent} from './auth.component';
import {AuthService} from './auth.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
  ],
  providers: [AuthService],
  declarations: [AuthComponent]
})
export class AuthModule { }
