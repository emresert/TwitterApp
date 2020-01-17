import { Injectable } from '@angular/core';
import { UserLoginDto } from '../dto/userLoginDto';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
// npm install angular2-jwt yükle.Token'nın datalarına erişmek için import edildi.
// npm i rxjs-compat --save  yardımcı komut hata gelirse.
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router'; // başarılı girişten sonra router işlemi için import etmemiz gerekir.
import { UserRegisterDto } from '../dto/userRegisterDto';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:44365/api/Auth/";
  userToken: any; // kullanıcı token bilgilerinin decode edilmemiş halini tutar.
  decodedUserToken: any; // Decode edilen json verisini tutar. Burada Json tipinde datayı tutmak için tanımlandı.
  TOKEN_KEY = "token"; // Her seferinde 'token' çağırmak yerine değişkene attık.
  JwtHelper: JwtHelper = new JwtHelper(); // jwt Helper methodlarına ulaşmak için tanımladık



  // Http Client ve Router constructor içinde tanımlanmalıdır.
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(loginUser: UserLoginDto) {

    let headers = new HttpHeaders();
    headers = headers.append("responseType", "text") //Http option gönder method 2

    // {responseType: 'text'} , apiden text bir token değeri döndüğü için kullanıldı.
    this.httpClient.post(this.apiUrl + 'login', loginUser, { responseType: 'text' }).pipe(
      tap(data => console.log(JSON.stringify(this.JwtHelper.decodeToken(data.toString())))),
      catchError(this.handleError)
    ).subscribe(data => {
      this.saveToken(data); // Token'ı local'e kaydet
      this.userToken = data; // Token'ı başka bir method vs. gibi yapılarda kullanmak için yedekledik
      this.decodedUserToken = this.JwtHelper.decodeToken(data.toString()); //Token'ı decode edip kullanıcı bilgilerine ulaştık.
      let notice = this.JwtHelper.decodeToken(this.Token).unique_name.toString();
      console.log(notice + ' is Logged!')
      alertify.success(notice + ' hesabı ile giriş yapıldı')
      this.router.navigateByUrl('home');
      console.log(this.router)
    })
  }

  register(registerUser: UserRegisterDto) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json")
    this.httpClient.post(this.apiUrl + 'register', registerUser, { headers: headers }).subscribe(data => {
    })
  }

  // Tokenı Locale Kaydetme Metodu
  saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token); //localde kullanıcı için gelen tokenı kaydet.
  }

  // Tokenı Locale Silerek kullanıcının çıkışını sağlarız
  logOut() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Kullanıcı Sisteme Login Durumunda olup olmadığını anlamak için yazılan metod.
  loggedIn() {
    // Kullanıcının tokenı olsa bile token süresi dolmuş olabilir.
    return tokenNotExpired(this.TOKEN_KEY);
  }

  // Var olan Tokenı getirme methodu
  get Token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  //Şuanki userin Id'sini getirme metodu.
  getCurrentUserId() {
    return this.JwtHelper.decodeToken(this.Token).nameid;
  }

  // Hataması döndürme
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