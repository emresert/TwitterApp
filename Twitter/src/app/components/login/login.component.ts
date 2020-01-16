import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

import { NgForm } from '@angular/forms';
import { UserLoginDto } from 'src/app/dto/userLoginDto';
import { AuthService } from 'src/app/services/auth.service';
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  userLoginDtoModel: UserLoginDto = new UserLoginDto();
  token:any;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    //npm i rxjs-compat --save
  }
  LoginUser(form: NgForm) {
    this.authService.login(this.userLoginDtoModel);
  }
  
  LogOutUser(){
    this.authService.logOut()
  }

  get isAuthenticated(){
   return this.authService.loggedIn();
  }
}  
