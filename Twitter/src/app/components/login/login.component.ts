import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  userModel: User = new User();
  user: User;
  constructor(private loginService: LoginService) { }

  ngOnInit() {
   
  }
  LoginUser(form: NgForm) {
    this.loginService.LoginUser(this.userModel).subscribe(data => {
      this.user = data;
      console.log(this.user);
    });
  }
}  
