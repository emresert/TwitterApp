import { Injectable } from '@angular/core';
import { UserLoginDto } from '../dto/userLoginDto';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelper,tokenNotExpired } from 'angular2-jwt'; // npm install angular2-jwt yükle.Token'nın datalarına erişmek için import edildi.
import { Router } from '@angular/router'; // başarılı girişten sonra router işlemi için import etmemiz gerekir.
import { UserRegisterDto } from '../dto/userRegisterDto';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "https://localhost:44365/api/Auth/";
  userToken: any;
  decodedUserToken: any;
  TOKEN_KEY = "token";

  JwtHelper: JwtHelper = new JwtHelper(); // jwt Helper methodlarına ulaşmak için tanımladık

  // Http Client ve Router constructor içinde tanımlanmalıdır.
  constructor(private httpClient: HttpClient, private router: Router) { }

  login(loginUser: UserLoginDto) {
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type", "application/json") //Http option gönder method 2
    this.httpClient.post(this.apiUrl + 'login', loginUser, { headers: headers }).subscribe(data => {
      this.saveToken(data);
      this.userToken = data;
      this.decodedUserToken = this.JwtHelper.decodeToken(data.toString()); //Gelen Token'ı decode et.
      alertify.success('Giriş Başarılı.')
      this.router.navigateByUrl('./home')
    }
    )
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
   get Token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }

  //Şuanki userin Id'sini getirme metodu.
  getCurrentUserId(){
    return this.JwtHelper.decodeToken(this.Token).nameid;
  }

 
}