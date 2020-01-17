import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserLoginDto } from 'src/app/dto/userLoginDto';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginDtoModel: UserLoginDto = new UserLoginDto();
  userTokenData:any;
  constructor(private authService: AuthService,private router :Router) {
    if (this.authService.userToken == undefined) {
      this.router.navigateByUrl('login');
    }
    else{
      this.userTokenData = this.authService.decodedUserToken;
    }
   }

  ngOnInit() {

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
