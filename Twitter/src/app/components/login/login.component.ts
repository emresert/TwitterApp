import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from 'src/app/models/user';
declare let  alertify:any; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  userModel : User = new User();
  constructor(private loginService : LoginService) { }

  ngOnInit() {

  }
getUser(user:User){
 
  this.loginService.getUser(user.userName).subscribe(user =>{
    if(user){
      this.userModel = user;
    }
    else{
      var closable = alertify.alert().setting('closable');
alertify.alert()
  .setting({
    'label':'Ok',
    'message': 'Kullanıcı adı veya şifre hatalı' ,
    'onok': function(){ alertify.warning('Bilgilerini kontrol et');}
  }).show();
    }
 
  }
  )}
}
