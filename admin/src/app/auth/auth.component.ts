import {Component, Input, OnInit} from '@angular/core';
import {Login} from './login.model';
import {AuthService} from './auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  errorMessage: String;
  @Input() login: Login;

  constructor(private loginService: AuthService
    , private route: ActivatedRoute
    , private router: Router) { }

  ngOnInit() {
    this.login = {
      username: '', password: ''
    };

    this.errorMessage = '';

    // this.loginService.doLogout();
  }


  doLogin(): void {
    this.router.navigate(['/']);
  }

}
