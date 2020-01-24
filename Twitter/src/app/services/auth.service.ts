import { Injectable } from '@angular/core';
import { UserLoginDto } from '../dto/userLoginDto';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'; 
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { UserRegisterDto } from '../dto/userRegisterDto'; 
import { tap, catchError } from 'rxjs/operators'; 
import { throwError } from 'rxjs'; 
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:44365/api/Auth/";
  userToken: any; 
  decodedUserToken: any; 
  TOKEN_KEY = "token"; 
  JwtHelper: JwtHelper = new JwtHelper(); 

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(loginUser: UserLoginDto) {

    let headers = new HttpHeaders();
    headers = headers.append("responseType", "text") 

    
    this.httpClient.post(this.apiUrl + 'login', loginUser, { responseType: 'text' }).pipe(
      tap(data => console.log(JSON.stringify(this.JwtHelper.decodeToken(data.toString())))),
      catchError(this.handleError)
    ).subscribe(data => {
      this.saveToken(data); 
      this.userToken = data; 
      this.decodedUserToken = this.JwtHelper.decodeToken(data.toString()); 
      let notice = this.JwtHelper.decodeToken(this.Token).unique_name.toString();
      console.log(notice + ' is Logged!')
      alertify.success(notice + ' hesabı ile giriş yapıldı')
      this.router.navigateByUrl('home');
    })
  }

  register(registerUser: UserRegisterDto) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")
    this.httpClient.post(this.apiUrl + 'register', registerUser, { headers: headers }).subscribe(data => {
    
    })
  }

  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token); 
  }

  // Giriş yapan kullanıcının local stroge alanından token'ı silinmesi
  // Gerekir ayrıca çıkış yapıldıktan sonra router yönlenmesi yapılmalıdır
  // Çıkış yapıldıktan sonra hata mesajı döndürüldü
  logOut() {
    let notice = this.JwtHelper.decodeToken(this.Token).unique_name.toString();
    localStorage.removeItem(this.TOKEN_KEY);
    alertify.error(notice + ' hesabından çıkış yapıldı')
    this.router.navigateByUrl('login');
  }

 
  loggedIn() {
    return tokenNotExpired(this.TOKEN_KEY);
  }


  get Token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }


  getCurrentUserId(){
    return this.JwtHelper.decodeToken(this.Token).nameid;
  }


  handleError(err: HttpErrorResponse) {
    let errorMessages = '';
    if (err.status == 401) {
      var closable = alertify.alert().setting('closable');
      alertify.alert()
        .setting({
          'label': 'Tamam',
          'message': 'Kullanıcı adı veya şifrenizi kontrol edin.',
          'onok': function () { alertify.error('Lütfen tekrar giriş yapın.'); }
        }).show();
    }
    else {
      errorMessages = "sistemsel bir hata oluştu";
    }
    return throwError(errorMessages);
  }

}